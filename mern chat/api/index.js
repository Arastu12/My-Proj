const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const jswt = require('jsonwebtoken');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jswtSecret = process.env.JSWT_SECRET;


app.get('/test', (req,res) => {
    res.json('test ok')
});

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    const createdUser = await User.create({username, password});
    jswt.sign({userId:createdUser._id}, jswtSecret, (err, token) =>{
        if (err) throw err;
        res.cookie('token').status(201).json('ok');
    } );
});

app.listen(4040);