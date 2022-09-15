const express = require("express");
const path = require("path");
const app = express();
const bp = require("body-parser");
const fs = require("fs");
let db = require("../assets/db.json");

const header = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type",
};

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));


app.get('/messages', (req, res) => {
    res.set(header)
    res.json(db.messages)
})

app.post('/messages', (req,res) => {
    res.set(header)
    const jsonData = JSON.stringify(req.body)
    fs.writeFile('../assets/db.json',jsonData,null,4)
})

app.listen(3002)
console.log('server listening on port 3002')