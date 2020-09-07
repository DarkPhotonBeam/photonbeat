var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
require('./api/lang.ts');
var ENV = process.env.NODE_ENV || 'development';
var port = 3030;
var socketPath = 'app.sock';
if (ENV === 'production') {
    try {
        if (fs.existsSync(socketPath))
            fs.unlinkSync(socketPath);
    }
    catch (err) {
        console.error(err);
    }
}
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.get('/test', function (req, res) {
    var response = {
        hello: 444
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
});
app.listen(ENV === 'production' ? socketPath : port, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        if (ENV === 'production') {
            fs.chmodSync(socketPath, '0777');
            console.log('Listening on ' + socketPath, 'color: #4422ee');
        }
        else {
        }
    }
});
//# sourceMappingURL=app.js.map