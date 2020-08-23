const path = require('path');
const db = require('./db');
const { Dept, Employee } = db.models;
const faker = require('faker');

const express = require('express');
const app = express();
app.use(require('body-parser').json());

//app.use('/dist', express.static(path.join(__dirnmae, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
//stopping point. need to creat bare bones HTML before moving on to rest of the server side