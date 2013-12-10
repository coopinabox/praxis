var express = require('express');
var static = require('ecstatic');

var task = require('./routes/task');

var app = express();

app.configure(function () {
  app.use(express.bodyParser());
//  app.use(static(__dirname + '/../static'));
});

app.get('/tasks', task.all);
app.get('/tasks/:id', task.get);
app.post('/tasks', task.create);
app.put('/tasks/:id', task.update);
app.delete('/tasks/:id', task.remove);

module.exports = app;
