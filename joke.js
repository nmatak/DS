const express = require("express");
const app = express();
const mysql = require("mysql2");
const fs = require("fs").promises;
const port = 3000;
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Point to static pages
app.use(express.static(path.join(__dirname, "public/html")));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

const HOST = "localhost";
const USER = "root";
const PASSWORD = "root";
const DATABASE = "jokesdb";

let conStr = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
};

const db = mysql.createConnection(conStr);

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to MySQL database: ${conStr.database}`);
});
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  db.query("SELECT * FROM jokes", (err, jokes) => {
    if (err) {
      console.log(`Database error: ${err.message}`);
    } else {
      res.send(jokes);
    }
  });
});

app.get("/type", (req, res) => {
  db.query("SELECT type FROM jokesdb.joke_types", (err, jokes) => {
    if (err) {
      console.log(`Database error: ${err.message}`);
    } else {
      res.json(jokes);
    }
  });
});

app.get("/joke", (req, res) => {
  let type = req.query.type || "any";
  let count = req.query.count || 1;
  let sql;

  if (type === "any") {
    sql = `SELECT * FROM jokes ORDER BY RAND() LIMIT ${count}`;
  } else {
    sql = `SELECT * FROM jokes WHERE type = '${type}' ORDER BY RAND() LIMIT ${count}`;
  }

  db.query(sql, [type], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

async function getType() {
  const result = new Promise((resolve, reject) => {
    const sql = `select type  from joke_types`;
    db.query(sql, (err, results) => {
      if (err) {
        reject(`Database error: ${err.message}`);
      } else {
        resolve(results);
      }
    });
  });
  return result;
}

// console.log(getType())
async function getJoke() {
  const result = new Promise((resolve, reject) => {
    const sql = `select joke from jokes`;
    db.query(sql, (err, results) => {
      if (err) {
        reject(`Database error: ${err.message}`);
      } else {
        resolve(results);
      }
    });
  });
  return result;
}
