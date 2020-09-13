const fs = require('fs')
const path = require('path')
const express = require('express')
//const bodyParser = require('body-parser')
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

//Middleware
const logger = (request, response, next) => {
    console.log(`\x1b[33m${request.method}\x1b[0m ${request.path} from ${request.headers['x-forwarded-for'] || request.connection.remoteAddress}`)
    next()
}

app.use(logger)
//app.use(bodyParser)

app.get('/api/test', (req, res) => {
    let response = {
        hello: 666
    }
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

            console.log('\x1b[36mListening on ' + socketPath + '\x1b[0m\n')
        } else {
            // Development
            console.log('\x1b[36mListening on port ' + port + '\x1b[0m\n')
        }
    }
})
