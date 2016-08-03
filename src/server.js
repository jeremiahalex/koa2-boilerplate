// include babel polyfills for async/await functionality
"use strict"
require("babel-core/register")
require("babel-polyfill")

const path = require('path')
const Koa = require('koa')
const send = require('koa-send')
const serve = require('koa-static');
const morgan = require('koa-morgan')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser');
// const responseTime = require('koa-response-time');
// const ratelimit = require('koa-ratelimit');
// const compress = require('koa-compress');
// const favicon = require('koa-favicon');
// const session = require('koa-session');

const app = new Koa()
const port = process.env.PORT || 3000
const pwd = process.cwd()
const router = require('./config/routes')

// Add view engine
app.use(views(path.join(pwd, 'views'), { extension: 'hbs', map: {hbs: 'handlebars' }}))

// MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser());

// Custom middleware
app.use(async (ctx, next) => {
  var start = new Date;
  try {
    await next();
    let ms = new Date - start;
    ctx.set('X-Response-Time', ms + 'ms');
  } catch (err) {
    ctx.body = err.message
    ctx.status = err.status || 500
  }
})

// app.use(require('koa-static')(__dirname + '/public'));
app.use(serve(path.join(pwd, 'public')))

// Routes
app.use(router.routes())
app.use(router.allowedMethods())

// Custom 404 - using send
app.use(async function (ctx, next){
  await send(ctx, 'public/404.html');
})

app.listen(port, () => {
  console.log('koa listening on port ' + port)
})
