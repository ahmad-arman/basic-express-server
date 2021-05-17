'use strict';


const express = require('express');
const app = express();

const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');

const logger = require('./middlware/logger.js');
const validator = require('./middlware/validator.js'); 

app.use(express.json());
app.use(logger);
// app.use(validator);



//localhost:3000/person?name=ahmad
app.get('/person',validator,(req, res) => {
    
    res.status(200).json({
        name: req.query.name 
    })
});




app.use('*', notFoundHandler);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => {
        console.log(`your server work on port ${port}`);
    });
}




module.exports={
    app :app,
    start : start
    
} 