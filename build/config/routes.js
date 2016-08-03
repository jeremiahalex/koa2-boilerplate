'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var router = require('koa-router')();

router.get('/', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = 'Welcome to Koa!';

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('/render', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ctx.render('rendered', { title: 'This Page is Rendered' });

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).post('/submit', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(ctx.request.body);
            ctx.body = 'Thanks for posting!';

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).get('/json', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ctx.body = { message: 'this is json' };

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7) {
    return _ref4.apply(this, arguments);
  };
}()).get('/back', function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(ctx) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ctx.redirect('back');
            //this.redirect('/login')

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x8) {
    return _ref5.apply(this, arguments);
  };
}());

// Simple Authentication Middleware
router.use(function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(ctx, next) {
    var authToken;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(ctx.header['auth-token']);
            authToken = ctx.header['auth-token'];

            if (!authToken || authToken !== '1234567890') {
              ctx.throw(401, 'unauthorised');
            } else {
              next();
            }

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}());

// Secret Routes
router.get('/secret', function (ctx, next) {
  ctx.body = 'Secret Posts!';
});

module.exports = router;