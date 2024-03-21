const express = require('express')
const app = express()
const mysql = require('mysql2')
const port = 3000


let conStr = {
    host: 'localhost',
    user: 'root', 
    password: 'Mataksmiley12',
    database: 'jokesm'
}

const db = mysql.createConnection(conStr);



app.get('/type', async (req, res) => { //returns the current list of types in the database to refresh the "types" list in the UI
    try {
      const result = await getType()
      res.send(result)
    } catch (err) {
      res.status(500).send(err) // Set status header before sending response
    }
  })

  app.get('/joke', async (req, res) => { //returns one or more jokes of a specific type, selected from the database and returned in a random order
    try {
      const result = await getType()
      res.send(result)
    } catch (err) {
      res.status(500).send(err) // Set status header before sending response
    }
  })


app.listen(port, () => console.log('Listening on port ${port}'))