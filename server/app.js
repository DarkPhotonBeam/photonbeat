const fs = require('fs')
const express = require('express')
const app = express()

const socketPath = 'app.sock'

try {
    if (fs.existsSync(socketPath)) fs.unlinkSync(socketPath)
    // file removed
} catch (err) {
    console.error(err)
}

app.get('/', (req, res) => {
   res.send('Damn son, where\'d you find this')
});

app.get('/test', (req, res) => {
    let response = {
        hello: 444
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(response))
})

app.listen(socketPath, (err) => {
    if (err) {
        console.error(err)
    } else {
        // Listening
        // Set socket permissions
        fs.chmodSync(socketPath, '0777')

        console.log('Listening on ' + socketPath, 'color: #4422ee')
    }
})