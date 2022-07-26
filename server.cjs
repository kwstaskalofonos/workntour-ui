var path = require('path');
var express = require('express');

var app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.get('/home', function(req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
// app.get('/opportunities', function(req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    console.log('listening on port ', server.address().port);
});