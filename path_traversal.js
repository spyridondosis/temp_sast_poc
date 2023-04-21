app.use('/', function (req, res) {
    const path = req.path;
    const filename = __dirname + "/public" + path;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end(err.toString());
        }
        res.writeHead(200);
        res.end(data);
    });
});
