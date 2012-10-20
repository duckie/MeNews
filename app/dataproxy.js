var express = require('express'),
app = express();
var http = require('http');
var restler = require('restler');
var port = process.env.PORT || 1235;

console.log("Listening on " + port);
//app.use(express.bodyParser());
app.listen(port);

app.get('/index.html', function(req, res) {
    res.sendfile(__dirname + '/app.html');
});

app.get('/lib/*', function(req, res) {
    res.sendfile(__dirname + req.url);
});
app.get('/css/*', function(req, res) {
    res.sendfile(__dirname + req.url);
});

app.all('/*', function(req, res) {
    req.url = req.query.url;
    restler.get(req.url, { headers: {'Referer':null, 'X-Requested-With':null} }).on('complete', function (data) {
        //res.set('Content-Type', 'application/xml');
        res.send(data);
    });

    /*http.get(req.url, function(response) {
        //console.log(response);
        //res.set('Content-Type', response.headers['Content-Type']);
        res.set('Content-Type', 'application/xml');
        response.on("data", function(text) {
            console.log(text);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });*/
});
