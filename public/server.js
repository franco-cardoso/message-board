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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/messages", (req, res) => {
  console.log(`${req.method} request from ${req.ip.split(":")[3]}`);

  res.json(db.messages);
});

app.post("/messages", (req, res) => {
  console.log(`${req.method} request from ${req.ip.split(":")[3]}`);

  const newDb = db.messages.push(req.body);
  res.send(newDb)

  const jsonData = JSON.stringify(newDb, null, 4);
  fs.writeFile(path.join(__dirname, '..', 'assets', 'db.json'), jsonData, (err) => {
    if (err) throw err
  });
});

app.listen(3002);
console.log("server listening on port 3002");
