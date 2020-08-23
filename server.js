const path = require('path');
const db = require('./db');
const { Dept, Employee } = db.models;
const faker = require('faker');

const express = require('express');
const app = express();
app.use(require('body-parser').json());

//app.use('/dist', express.static(path.join(__dirnmae, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/employess', async (req, res, next) => {
    try {
        res.send(await Employee.findAll())
    } catch(err) {
        next(err)
    }
})

const init = async()=> {
    try {
        await db.syncAndSeed();
        //Change below for deployment
        const port = 3000;
        app.listen(port, ()=> console.log(`Listening on port ${port}`));
    } catch(err){
        console.log(err)
    }
}

init()