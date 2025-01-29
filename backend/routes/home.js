const {Router} = require('express') ;
const router = Router() ;
const TodoApp = require('../db/Todos') ;


router.get('/', async (req,res) => {
return res.json({users: await TodoApp.find({})}) ;
})

router.post('/add-todo', async (req, res) => {}) ;

router.post('/start-todo/:todoId', async (req,res) => {
// here we are going to add the start time and change status to Doing
})

router.get('/current-todos', async (req,res) => {}) ;

router.get('/completed-todos', async (req,res)=>{}) ;

router.delete('/delete-completed-todos/:todoId',async (req,res) =>{}) ;

router.delete('/delete-current-todos/:todoId', async (req,res) => {}) ;

router.patch('/update-todo/:todoId', async (req,res) => {
// here we are going to update the todo , we are only gonna update the todo that is not started State
// if it is in Doing state there is no need to update
}) ;

router.post('/mark-as-done/:todoid', async (req,res) => {
// here we are going to add the endDate and change status to Done
}) ;

module.exports = router ;




