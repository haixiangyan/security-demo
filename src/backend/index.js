const express = require('express')
const mysql = require('mysql')
const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'security'
})

app.get('/xxs', function (req, res) {
    connection.connect()

    connection.query('select * from xxs_review', function (err, rows, fields) {
        if (err) { throw err }
        res.json({ resources: rows })
    })

    connection.end()
})

app.get('/sql-inject', function (req, res) {
    connection.connect()

    connection.query('select * from sql_inject_user', function (err, rows, fields) {
        if (err) { throw err }
        res.json({ resources: rows })
    })

    connection.end()
})

app.listen(3000)
