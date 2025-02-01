const jwt = require('jsonwebtoken') ;
const {secreatKey} = require('../config') ;
const {z} = require('zod') ;
const TodoApp = require('../db/Todos') ;
const objectID = require('mongoose').Types.ObjectId ;

async function authorizationCheck(req,res,next){
    try{
            // even if we pass the authorization key name with capital letters , we should only
            // acess them with small case only
            // console.log(`Authorization key ${req.headers['authorization']}`)
            const result = jwt.verify(req.headers['authorization'],secreatKey) ;
            // console.log(result, " date now ", Date.now()) ;
            if(result.expiry < Date.now()) return res.status(403).json({"message": "Authorization was expired", value: false})
            req.username = result.username ;
            if(!z.string().min(3).max(18).safeParse(req.username).success) 
                return res.status(404).json({"message": "user not found", value: false}) ;
            
            return next() ;
        
    }catch(err){
        return res.json({"message": "Invalid Authorization key", value: false})
    }
}

async function todoCheck(req,res,next){
    const titleSchema = z.string().min(3).max(18) ;
    const  description = z.string().min(3).max(250) ;
    if(titleSchema.safeParse(req.body.title).success && description.safeParse(req.body.description).success){
        return next() ;
    }
    return res.json({"message": "invalid length of title or description", value: false}) ;
}


async function usernameCheck(req,res,next){
        console.log(`username ${req.username}`)
    if(await TodoApp.findOne({username: req.username})) return next() ;
    return res.status(404).json({"message": "user not found", value: false})
}

async function ObjecIdCheck(req,res,next){
    // here we are checking whether the objectID was correct or not
    if(objectID.isValid(req.params.todoId)) return next() ;
    return res.status(400).json({"message": "invalid todo id", "value": false})
} 





module.exports = {todoCheck, authorizationCheck, usernameCheck,ObjecIdCheck} ;