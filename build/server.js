// include babel polyfills for async/await functionality
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");

var path = require('path');
var Koa = require('koa');
var send = require('koa-send');
var serve = require('koa-static');
var morgan = require('koa-morgan');
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');
// const responseTime = require('koa-response-time');
// const ratelimit = require('koa-ratelimit');
// const compress = require('koa-compress');
// const favicon = require('koa-favicon');
// const session = require('koa-session');

var app = new Koa();
var port = process.env.PORT || 3000;
var pwd = process.cwd();
var router = require('./config/routes');

// Add view engine
app.use(views(path.join(pwd, 'views'), { extension: 'hbs', map: { hbs: 'handlebars' } }));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser());

// Custom middleware
app.use(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    var start, ms;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start = new Date();
            _context.prev = 1;
            _context.next = 4;
            return next();

          case 4:
            ms = new Date() - start;

            ctx.set('X-Response-Time', ms + 'ms');
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            ctx.body = _context.t0.message;
            ctx.status = _context.t0.status || 500;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// app.use(require('koa-static')(__dirname + '/public'));
app.use(serve(path.join(pwd, 'public')));

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Custom 404 - using send
app.use(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return send(ctx, 'public/404.html');

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.listen(port, function () {
  console.log('koa listening on port ' + port);
});