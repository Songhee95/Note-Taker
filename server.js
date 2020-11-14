const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(PORT, function(){
    console.log("app listening on port : " + PORT);
})