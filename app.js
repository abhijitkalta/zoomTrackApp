var express = require('express');
var app = express();
app.use(express.static(__zoomcarApp + '/app'));
app.listen(process.env.PORT || 3000);
