const express = require('express')
const app = express()
const mysql = require('mysql2')
const fs = require('fs').promises
const port = 3000
const path = require ('path');
require('dotenv').config()

// Point to static pages
app.use(express.static(path.join(__dirname,'public/html')));
app.use(express.static(path.join(__dirname,'public/css')));
app.use(express.static(path.join(__dirname,'public/js')));

const HOST = process.env.HOST
const USER = process.env.MYSQL_USER
const PASSWORD = process.env.MYSQL_PASSWORD
const DATABASE = process.env.MYSQL_DATABASE

let conStr = {
    host: HOST,
    user:  USER, 
    password: PASSWORD,
    database: DATABASE
}

const db = mysql.createConnection(conStr)

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database: ${conStr.database}')
})

app.get('/', (req, res) =>{
    const sql= 'SELECT * FROM jokes'
    db.query('SELECT * FROM jokes', (err, jokes) => {
        if (err){
            console.log('Database error: ${err.message}')
        } else {
            res.send(jokes)
        }
    })
})

app.get('/type', (req, res) =>{
    const sql= 'SELECT jokes_type FROM jokes'
    db.query('SELECT jokes_type FROM jokes', (err, jokes) => {
        if (err){
            console.log('Database error: ${err.message}')
        } else {
            res.send(jokes)
        }
    })
})

app.get('/joke', (req, res) =>{
    const sql= 'SELECT jokes FROM jokes'
    db.query('SELECT jokes FROM jokes', (err, jokes) => {
        if (err){
            console.log('Database error: ${err.message}')
        } else {
            res.send(jokes)
        }
    })
})

async function getType() {
    const result = new Promise((resolve, reject) => {
      const sql = `select type  from jokes`
      db.query(sql, (err, results) => {
        if (err) {
          reject(`Database error: ${err.message}`)
        } else {
          resolve(results)
        }
      })
    })
    return result
  }

  async function getJoke() {
    const result = new Promise((resolve, reject) => {
      const sql = `select joke  from jokes`
      db.query(sql, (err, results) => {
        if (err) {
          reject(`Database error: ${err.message}`)
        } else {
          resolve(results)
        }
      })
    })
    return result
  }

app.listen(port, () => console.log('Listening on port ${port}'))
