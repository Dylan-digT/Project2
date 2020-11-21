const express = require('express');
const app = express();     //spin up exspress
const morgan = require('morgan');
const bodyParser = require('body-parser');      //import the body parser
const mongoose = require('mongoose');     //import mongoose

const productRoutes = require('./api/routes/products');
//const orderRoutes = require('./api/routes/orders');                      //oreders does not work should maybe only use products
// call and connect mongoose database insert password 
mongoose.connect('mongodb+srv://Dylan:Cuf43915@cluster0.v7cpk.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})


//incomming request
app.use(morgan('dev'));     // login middleware
app.use(bodyParser.urlencoded({extended: false}));      //body middleware
app.use(bodyParser.json());                          //extracts json data to make it easy readable 

app.use((req, res, next) =>  {                // middleware with arrow function for CORS      //alows other wepages to not access your api
    res.header('Access-Control-Allow-Orgin', '*');
    res.header('Allow-control-Allow-Headers',
     'Origin, X-Requested-with, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');                     //ensure to prevent CORS errors
        return res.status(200).json({});
    }
    next();
});

// routes should handle request
app.use('/products', productRoutes);   //sets up middleware
//app.use('/orders', orderRoutes); 

app.use((req, res, next)  =>{              //to Handle request errors
    const error = new Error('Not found');
    error.status = 404;                      //set status code
    next(error);                             //forward the error request 
})       
// helps with any errors in the application or in the database
app.use((error, req, res, next) => {
    res.status(error.status || 500);           //assign 500 for all other kinds of errors
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app; 