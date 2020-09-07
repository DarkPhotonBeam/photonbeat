var fs = require('fs');
var express = require('express');
var app = express();
require('./api/lang.ts');
var socketPath = 'app.sock';
try {
    if (fs.existsSync(socketPath))
        fs.unlinkSync(socketPath);
    // file removed
}
catch (err) {
    console.error(err);
}
app.get('/', function (req, res) {
    res.send('Damn son, where\'d you find this');
});
app.get('/test', function (req, res) {
    var response = {
        hello: 444
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
});
app.listen(socketPath, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        // Listening
        // Set socket permissions
        fs.chmodSync(socketPath, '0777');
        console.log('Listening on ' + socketPath, 'color: #4422ee');
    }
});
