const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//send file
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
})
app.get("/styles", function(req,res){
    res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"));
})
app.get("/index", function(req,res){
    res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
})

let db = require('./db/db.json');
let data = [];
// get data from notes.html
app.get('/api/notes', function(req,res){
    let json = (JSON.stringify(db));
    fs.writeFileSync("./db/db.json", json, 'utf8', function(err, data){
        if(err) return err;
    }); 
    res.json(db);
})

app.post("/api/notes", function(req,res){
    req.body.id = req.body.title;
    data = req.body;
    db.push(data); 
})
app.delete("/api/notes/:id", function(req,res){
    const del = req.params.id;
    db.map(index => {
        if(index.id === del){
            db.splice(index,1);
        }
    })
    res.send(db);
})

app.listen(PORT, function(){
    console.log("app listening on port : " + PORT);
})