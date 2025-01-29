const express = require('express') ;
const Authrouter = require('./routes/Authentication') ;
const homeRouter = require('./routes/home') ;
const mongoose = require('mongoose') ;
const app = express() ;
app.use(express.json()) ;

mongoose.connect("mongodb://localhost:27017/todolist")

// for routes like '/' we mean go for authentication
app.use('/Authentication',Authrouter) ;
app.use('/', homeRouter) ;

app.listen(9999, () => console.log("Listening to the port 9999"))

