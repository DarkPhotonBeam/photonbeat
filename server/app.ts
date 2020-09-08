const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const ENV = process.env.NODE_ENV || 'development'

const port = 3030
const socketPath = 'app.sock'

if (ENV !== 'development') {
    try {
        if (fs.existsSync(socketPath)) fs.unlinkSync(socketPath)
        // file removed
    } catch (err) {
        console.error(err)
    }
}

app.get('/api/test', (req, res) => {
    let response = {
        hello: 666
    }
    res.setHeader('Content-Type', 'application/json')
    res.json(response)
})

app.listen(ENV !== 'development' ? socketPath : port, (err) => {
    if (err) {
        console.error(err)
    } else {
        // Listening
        if (ENV !== 'development') {
            // Production
            // Set socket permissions
            fs.chmodSync(socketPath, '0777')

            console.log('Listening on ' + socketPath)
        } else {
            // Development
            console.log('Listening on port sees')
        }
    }
})
