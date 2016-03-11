// dev server, replicating the structure of static build (same paths)

var express = require('express');
var app = express();

app.use('/', express.static('embed'));
app.use('/lib', express.static('build'));

app.listen(4000, () => console.log('App listening on port 4000!'));
