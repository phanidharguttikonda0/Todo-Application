const mongoose = require('mongoose') ;


const todos = new mongoose.Schema({
title: {type: String, required: true},
description: {type:String, required: true},
startTime: {type: Date} ,
endTime: {type: Date},
status : { type: String, enum: ['not yet started', 'Doing', 'Done'], default: 'not yet started'}
}, {timestamps: true}) ;

/* 

where for each document inserted the Time Stamp will be added like createdTimeStamp, updatedTimeStamp two feilds
were added automatically by mongo db
*/


const TodoList = new mongoose.Schema({
username: String,
mail: String,
password: String,
todos: [todos]
}, {timestamps: true}) ; // timestamps helps in when the document was created and when was last time it was updated

// indexes for fast quering
TodoList.index({username: 1}) ;
TodoList.index({mail: 1}) ;

const TodoApp = mongoose.model('Todos', TodoList) ;

module.exports = TodoApp ;

