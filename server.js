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
// get data from notes.html
app.get('/api/notes', function(req,res){
    res.json(db);
})

app.post("/api/notes", function(req,res){
    db.push(req.body); 
    let json = JSON.stringify(db);
    fs.writeFile("./db/db.json", json, 'utf8', function(err, data){
        if(err) return err;
        console.log(data);
    }); 
})
// app.delete("/api/notes/:id", function(req,res){
//     const rev = req.params.rev;
//     db.remove(req.params.id, rev);
// })

app.listen(PORT, function(){
    console.log("app listening on port : " + PORT);
})