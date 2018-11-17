const Router = require('koa-router');
const UserDAO = require('./UserDAO');
const AsyncService = require('../services/AsyncServiceMock');

const router = new Router();
const asyncService = new AsyncService();

router
	.get('/', async (ctx, next) => {
		try {
			await asyncService.doAsyncOperation();
			ctx.body = UserDAO.getAllUsers();
		} catch (err) {
			ctx.body = 'Something went wrong';
		}
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
