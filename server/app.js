var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var ENV = process.env.NODE_ENV || 'development';
var port = 3030;
var socketPath = 'app.sock';
if (ENV !== 'development') {
    try {
        if (fs.existsSync(socketPath))
            fs.unlinkSync(socketPath);
    }
    catch (err) {
        console.error(err);
    }
}
app.get('/api/test', function (req, res) {
    var response = {
        hello: 666
    };
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
});
app.listen(ENV !== 'development' ? socketPath : port, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        if (ENV !== 'development') {
            fs.chmodSync(socketPath, '0777');
            console.log('Listening on ' + socketPath);
        }
        else {
            console.log('Listening on port sees');
        }
    }
});
//# sourceMappingURL=app.js.map