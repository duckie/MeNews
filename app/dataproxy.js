var express = require('express'),
app = express();
var http = require('http');
var restler = require('restler');
var port = process.env.PORT || 1235;

console.log("Listening on " + port);
//app.use(express.bodyParser());
app.use(express.static(__dirname));
app.listen(port);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/app.html');
});

app.get('/proxy', function(req, res) {
    req.url = req.query.url;
    restler.get(req.url, { headers: {'Referer':null, 'X-Requested-With':null} }).on('complete', function (data) {
        res.send(data);
    });
});
