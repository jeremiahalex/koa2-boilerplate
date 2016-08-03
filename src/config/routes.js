var router = require('koa-router')()

router
  .get('/', async (ctx, next) => {
    ctx.body = 'Welcome to Koa!'
  })
  .get('/render', async (ctx, next) => {
    await ctx.render('rendered', { title: 'This Page is Rendered'})
  })
  .post('/submit', async (ctx, next) => {
    console.log(ctx.request.body) 
    ctx.body = 'Thanks for posting!'
  })
  .get( '/json', async (ctx) => {
    ctx.body = { message: 'this is json'};
  })
  .get( '/back', async (ctx) => {
    ctx.redirect('back')
    //this.redirect('/login')
  })

// Simple Authentication Middleware
router.use( async (ctx, next) => {
  console.log(ctx.header['auth-token'])
  const authToken = ctx.header['auth-token']
  if (!authToken || authToken !== '1234567890') {
    ctx.throw(401, 'unauthorised')
  } else {
    next()
  }
})

// Secret Routes
router.get('/secret', function (ctx, next) {
  ctx.body = 'Secret Posts!'
})

module.exports = router
