const {Router} = require('express') ;
const router = Router() ;
const TodoApp = require('../db/Todos') ;
const {todoCheck, authorizationCheck,usernameCheck,ObjecIdCheck} = require('../middleware/Todos') ;
const { default: mongoose } = require('mongoose');


router.get('/', async (req,res) => {
return res.json({users: await TodoApp.find({})}) ;
})

router.post('/add-todo', todoCheck, authorizationCheck, usernameCheck, async (req, res) => {
    
    try{
        const result = await TodoApp.updateOne({username: req.username}, {
            $push: { todos: {
                title: req.body.title,
                description: req.body.description
            }}
        })
    
        if(result.modifiedCount > 0) 
            return res.status(201).json({message: "sucessfully added", value: true}) ;
    }
    catch(err){
        return res.status(500).json({message: "Internal Server Error", value: false}) ;
    }
    
    return res.status(404).json({"message": "something weird happend check the code", value: false}) ;
}) ;

router.post('/start-todo/:todoId', authorizationCheck, usernameCheck,ObjecIdCheck, async (req, res,next) => {
    // here we are going to check whether the todo was in the status not started
    const result = await TodoApp.findOne({username: req.username, "todos._id": req.params.todoId},{"todos.$": 1}) ;
    if(result === null) return res.status(404).json({"message":"todo not found to start", value: false})
    if(result.todos[0].startTime === null) return next() ;
    return res.status(403).json({"message": "Already the todo was started", value: false}) ;
}, async (req,res) => {
    // here we are going to add the start time and change status to Doing
    try{
        const result = await TodoApp.updateOne({username: req.username, "todos._id": req.params.todoId},{
            $set : {"todos.$.startTime": Number(Date.now().toLocaleString().replaceAll(',','')), 
                "todos.$.status": "Doing"}
        }) ;
        if(result.modifiedCount === 0 ) return res.status(400).json({"message": "Not updated due to error", value: false}) ;
        return res.status(201).json({"message":"Started the Time", value: true}) ;
    }catch(err){
        console.log(`The error was ${err}`) ;
        return res.status(500).json({"message": "Internal Server Error"}) ;
    }
}) ;


router.get('/current-todos', authorizationCheck, usernameCheck, async (req,res) => {
    try{

        const result = await TodoApp.findOne(
            { username: req.username },
            { 
                todos: { 
                    $filter: { 
                        input: "$todos", 
                        as: "todo", 
                        cond: { $ne: ["$$todo.status", "Done"] } 
                    } 
                } 
            }
        );
        
        
        console.log(result.todos) ;
        res.status(200).json({"message" : "got it", value: result.todos})

    }catch(err){
        console.log(`The error was ${err}`) ;
        return res.status(500).json({"message": "internal server error", value: false}) ;
    }
}) ;

router.get('/completed-todos', authorizationCheck, usernameCheck, async (req,res)=>{
    try{
        const result = await TodoApp.findOne(
            { username: req.username },
            { 
                todos: { 
                    $filter: { 
                        input: "$todos", 
                        as: "todo", 
                        cond: { $eq: ["$$todo.status", "Done"] } 
                    } 
                } 
            }
        );
        
        console.log(result) ;
        res.status(200).json({"message": "got it", value: result.todos}) ;
    }catch(err){
        console.log(`The error was ${err}`) ;
        return res.status(500).json({"message": "internal server error", value: false}) ;
    }
}) ;


router.delete('/delete-todo/:todoId', authorizationCheck, usernameCheck, ObjecIdCheck, async (req,res) => {
    try{
        const result = await TodoApp.updateOne({username: req.username, "todos._id": req.params.todoId},
            {
                $pull: {todos:{ _id: req.params.todoId}}
            }
        )
        if(result.modifiedCount === 0) return res.status(404).json({"message": "todo item not found", value: false}) ;
        return res.status(200).json({"message": "sucessfully deleted","value":true}) ;
    }catch(err){
        console.log(`The error was ${err}`) ;
        return res.status(500).json({"message": "Internal Server Error", value: false}) ;
    }
}) ;

router.patch('/update-todo/:todoId', authorizationCheck, usernameCheck,ObjecIdCheck,async (req,res,next) =>{
    // we need to check whether the todo id has status not started yet or not
    try{
        const result = await TodoApp.findOne({username: req.username, "todos._id": req.params.todoId}, {"todos.$": 1}) ;
        if(result.todos[0].status !== "not yet started"){
            return res.status(404).json({message: "not applicable to update this task", value: false})
        }
        return next() ;
    }catch(err){
        console.log(`Error was ${err}`) ;
        return res.status(500).json({message: "Internal Server Error", value: false}) ;
    }
}, todoCheck,async (req,res) => {
    // note : we need to send both the title and description , if user has changed only one 
    // then the client need to pass the same description
    try{
        const result = await TodoApp.updateOne({username: req.username, "todos._id": req.params.todoId},{
            $set: { "todos.$.title": req.body.title, "todos.$.description": req.body.description}
        }) ;
        if(result.modifiedCount === 0) return res.status(500).json({message:"not updated due to some error",value:false}) ;
        return res.status(201).json({"message":"sucessfully updated",value:true}) ;
    }catch(err){
        console.log(`error was ${err}`) ;
        return res.status(500).json({"message": "Internal Server Error", value: false}) ;
    }
}) ;

router.post('/mark-as-done/:todoid', authorizationCheck, usernameCheck,ObjecIdCheck, async (req,res,next) => {
    const result = await TodoApp.findOne({username: req.username, "todos._id": req.params.todoid}, {"todos.$": 1}) ;
    if(result && result.todos[0].startTime !== null && result.todos[0].endTime === null){
        return next() ;
    }
    return res.status(403).json({"message": "you can't mark it as done", value: false}) ;
} ,async (req,res) => {
// here we are going to add the endDate and change status to Done
    try{
        console.log(1)
        const result = await TodoApp.updateOne({username: req.username, "todos._id": req.params.todoid},{
            $set: { "todos.$.endTime" : Number(Date.now().toLocaleString().replaceAll(',','')), "todos.$.status": "Done"}
        }) ;
        if(result.modifiedCount === 0) return res.status(500).json({"message": "not updated", value: false}) ;
        return res.status(201).json({"message": "Sucessfully marked as done", value: true})
    }catch(err){
        console.log(`The error was ${err}`) ;
        return res.status(500).json({"message": "Internal Server Error", value: false}) ;
    }
}) ;

module.exports = router ;




