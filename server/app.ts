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

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

app.get('/test', (req, res) => {
    let response = {
        hello: 444
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(response))
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