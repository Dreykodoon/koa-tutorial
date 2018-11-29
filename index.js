const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');

const users = require('./src/user/UserRoute');
const files = require('./src/file/FileRoute');

const app = new Koa();
const router = new Router();

router
	.use('/user', users.routes(), users.allowedMethods())
	.use('/file', files.routes(), files.allowedMethods());

app
	.use(koaBody({multipart: true}))
	.use(serve(path.join(__dirname, '/public')))
	.use(router.routes())
	.use(router.allowedMethods());

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
