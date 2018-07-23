//Requiring the express middleware
const express=require('express');
//Creating an instance of express
const app=express();
var request = require('request');
//Requiring  modules
const path= require('path');
const bodyparser = require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');

//requiring cors for Cross Oriented Resource Sharing, so that same services on different ports can be used. 
const cors = require('cors');
app.use(cors());

//requiring websockets

//const WS = require('./WebSocket/webSocket');
const WS = require('./WebSocket/webSocket');

const BC = require('./Blockchain/blockchain')

//REquiring credential files:
const cred=require('./config/credentials');

//-------------------MongoDB Operations---------------------

mongoose.connect(cred.database);

mongoose.connection.on('connected',()=>{
    console.log("Connected to Database");
    
})

mongoose.connection.on('error',(err)=>{
    console.log("Error connecting Database");
    
})

//use of environment defined port if available otherwise 8080
const port = process.env.port||8090;

//express static folder path
app.use(express.static (path.join(__dirname,"public")));
//using body parser for parsing json file from request
app.use(bodyparser.json());
app.use(morgan('dev'));

//requiring routes as resources
const node = require('./routes/node');
const reqGetData = require('./routes/reqGetData');
const txn = require('./routes/txn');
const confirmation =require('./routes/confirmation')
const publish=require('./routes/publish')
const addNameZoneType=require('./routes/addNameZoneType')
const conversion=require('./routes/conversion')



//using routes for resources
app.use('/node',node);
app.use('/reqGetData',reqGetData);
app.use('/txn',txn);
app.use('/confirmation',confirmation)
app.use('/publish',publish)
app.use('/addNameZoneType',addNameZoneType)
app.use('/conversion',conversion)


//Routing all request to the static file
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
});

//start listening to the request

app.listen(port,()=>{
    console.log("Server running on port"+port);
});

WS.initP2PServer();
