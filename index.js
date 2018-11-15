const Koa = require('koa');
const Router = require('koa-router');
const UserDAO = require('./src/UserDAO');

const app = new Koa();
const router = new Router();

router
	.get('/', (ctx, next) => {
		ctx.body = 'Hello World';
	})
	.get('/user', (ctx, next) => {
		ctx.body = UserDAO.getAllUsers();
	})
	.get('/user/:name', (ctx, next) => {
		const { name } = ctx.params;
		ctx.body = UserDAO.userExists(name);
	})
	.put('/user/:name', (ctx, next) => {
		const { name } = ctx.params;
		ctx.body = UserDAO.createUser(name);
	})
	.delete('/user/:name', (ctx, next) => {
		const { name } = ctx.params;
		ctx.body = UserDAO.deleteUser(name);
	});

app
	.use(router.routes())
	.use(router.allowedMethods());

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
