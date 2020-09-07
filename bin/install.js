const fs = require('fs')
const { exec } = require('child_process')

console.log('\x1b[34m%s\x1b[0m', 'Installing Node Modules...')

exec('cd ../client && yarn install', (error, stdout, stderr) => {
    if (error) {
        console.error(`\x1b[31mError: ${error.message}\x1b[0m`)
        return
    }
    if (stderr) {
        console.error(`\x1b[31mStderr: ${stderr}\x1b[0m`)
        return
    }
    console.log(stdout)
})

exec('cd ../server && yarn install', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`)
        return
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return
    }
    console.log(stdout)
})



