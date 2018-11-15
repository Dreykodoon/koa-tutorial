const Router = require('koa-router');
const UserDAO = require('./UserDAO');

const router = new Router();

router
	.get('/', (ctx, next) => {
		ctx.body = UserDAO.getAllUsers();
	})
	.get('/:name', (ctx, next) => {
		const {name} = ctx.params;
		ctx.body = UserDAO.userExists(name);
	})
	.put('/:name', (ctx, next) => {
		const {name} = ctx.params;
		ctx.body = UserDAO.createUser(name);
	})
	.delete('/:name', (ctx, next) => {
		const {name} = ctx.params;
		ctx.body = UserDAO.deleteUser(name);
	});

module.exports = router;
