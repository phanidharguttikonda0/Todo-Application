const {Router} = require('express') ;
const router = Router() ;
const {inputValidation, emailValidation,userNameCheck} = require('../middleware/Authentication') ;
const jwt = require('jsonwebtoken') ;
const TodoApp = require('../db/Todos') ;

router.post('/sign-up', inputValidation, emailValidation,userNameCheck, async (req,res) => {
const email = req.body.email; 
const password = req.body.password ;
const username = req.body.username ;

await TodoApp.create({
email,
username,
password
});

return res.json({message: "sucessfully Created User", value: true})

}) ;

router.post('/sign-in', inputValidation, async (req,res) => {
const password = req.body.password ;
const username = req.body.username ;

const result = await TodoApp.findOne({username, password}) ;
if(result) return res.json({message: "user Exists", value: true}) ;

return res.json({message: "user doesn't exists",value: false}) ;

}) ;

module.exports = router;

