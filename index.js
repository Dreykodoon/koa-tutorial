const Koa = require('koa');
const Router = require('koa-router');
const users = require('./src/user/UserRoute');

const app = new Koa();
const router = new Router();

router
	.get('/', (ctx, next) => {
		ctx.body = 'Hello World';
	});

router.use('/user', users.routes(), users.allowedMethods());

app
	.use(router.routes())
	.use(router.allowedMethods());

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
