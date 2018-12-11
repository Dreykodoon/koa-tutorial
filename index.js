const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session');
const path = require('path');

const users = require('./src/user/UserRoute');
const files = require('./src/file/FileRoute');

const app = new Koa();
app.keys = ['my little secret']; // To be changed on real implementation!

const router = new Router();

router
	.use('/user', users.routes(), users.allowedMethods())
	.use('/file', files.routes(), files.allowedMethods());

app
	.use(session(app))
	.use(async (ctx, next) => {
		const n = ctx.session.views || 0;
		ctx.session.views = n + 1;
		  
		await next();
	})
	.use(koaBody({multipart: true}))
	.use(serve(path.join(__dirname, '/public')))
	.use(router.routes())
	.use(router.allowedMethods());

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
