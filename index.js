var http = require('http');
var ss = require('socketstream');

// code formatters
ss.client.formatters.add(require('ss-less'));
ss.client.templateEngine.use('angular');

// responders
ss.responders.add(require('ss-angular'), { pollFreq: 1000 });

// define main client
ss.client.define('main', {
  view: 'index.html',
  css: [
    'libs/angular-xeditable/xeditable.css',
    'index.less',
  ],
  code: [
    'libs/jquery/jquery.js',
    'libs/underscore/underscore.js',
    'libs/bootstrap/bootstrap.js',
    'libs/angular/angular.js',
    'libs/angular-route/angular-route.js',
    'libs/angular-xeditable/xeditable.js',
    'app',
  ],
  tmpl: '*',
});
ss.client.set({
  browserifyExcludePaths: [
    'app/controllers',
    'app/directives',
  ],
});

ss.http.route('/', function(req, res) {
  res.serveClient('main');
});

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets()

// start console server
var consoleServer = require('ss-console')(ss);
consoleServer.listen(5000);

// start http server
var httpServer = http.Server(ss.http.middleware);
httpServer.listen(4000);

// start ss server
ss.start(httpServer);
