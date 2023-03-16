'use strict';

import * as path from 'path';

import fetch from 'node-fetch'; //npm install node-fetch
// import  {fetch} from './fetchlib.js';

//define require
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
//define __dirname
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const express = require('express');
const app = express();
const {port,host}=require('./config.json');

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'menu.html')));

app.get('/getAll', (req,res)=>{
    fetch('http://localhost:5000/api/superheros')
        .then(data=>data.json())
        .then(result=>res.json(result))
        .catch(err=>res.json(err));
});

app.get('/getOne/:id',(req,res)=>{
    fetch(`http://localhost:5000/api/superheros/${req.params.id}`)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add',(req,res)=>{
    const superhero = req.body;
    const options = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(superhero)
    };
    fetch('http://localhost:5000/api/superheros',options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/update', (req,res)=>{
    const heroInfo = req.body;
    const options = {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(heroInfo)
    };
    fetch(`http://localhost:5000/api/superheros/${heroInfo.heroID}`,options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/remove',(req,res)=>{
    const heroID = req.body.id;
    const options = {
        method:'DELETE'
    };
    if(heroID && heroID.length>0){
        fetch(`http://localhost:5000/api/superheros/${heroID}`, options)
            .then(data => data.json())
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
    else{
        res.json({message:'empty id', type:'error'});
    }
});


app.all('*', (req,res)=> res.json('Incorrect endpoint'));

app.listen(port,host,()=>console.log(`${host}:${port} serving...`));