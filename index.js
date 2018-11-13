const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
	ctx.body = 'Hello World';
});

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
