require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./middleware/authenticate');
const customerRouter = require('./routes/customer');

const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(process.env.DB_CONNECTION_URI, DB_CONFIG, err => {
    if (err) throw err;
    else {
        console.log('Successfully connected to database.');
    }
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', authenticate, customerRouter);


const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log(`MgmtServer is running on port ${PORT}`);
});

