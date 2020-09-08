const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
//require('./api/lang.ts')

const ENV = process.env.NODE_ENV || 'development'

const port = 3030
const socketPath = 'app.sock'

if (ENV === 'production') {
    try {
        if (fs.existsSync(socketPath)) fs.unlinkSync(socketPath)
        // file removed
    } catch (err) {
        console.error(err)
    }
}

app.use(express.static(path.join(__dirname, 'build')))
//app.use(express.static(path.join(__dirname, 'build/static')))


console.log(`React Path: ${path.join(__dirname, 'build')}`)
app.get('/api/test', (req, res) => {
    let response = {
        hello: 666
    }
    res.setHeader('Content-Type', 'application/json')
    res.json(response)
})

app.get('/*', (req, res) => { // Has to be at bottom
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(ENV === 'production' ? socketPath : port, (err) => {
    if (err) {
        console.error(err)
    } else {
        // Listening
        if (ENV === 'production') {
            // Production
            // Set socket permissions
            fs.chmodSync(socketPath, '0777')

            console.log('Listening on ' + socketPath, 'color: #4422ee')
        } else {
            // Development
        }
    }
})