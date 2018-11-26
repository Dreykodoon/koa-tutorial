const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');

const users = require('./src/user/UserRoute');

const app = new Koa();
const router = new Router();

router.use('/user', users.routes(), users.allowedMethods());

router.post('/', (ctx, next) => {
	const saveFile = (file) => {
		const reader = fs.createReadStream(file.path);
		const fileName = file.name ? file.name : Math.random().toString();
		const stream = fs.createWriteStream(path.join(__dirname, '/public', fileName));
		reader.pipe(stream);
		console.log('uploading %s -> %s', file.name, stream.path);
	};

	const files = ctx.request.files.file;
	if (files instanceof Array) {
		files.forEach((file) => {
			saveFile(file);
		})
	} else {
		saveFile(files);
	}

	ctx.redirect('/');
});

app
	.use(koaBody({multipart: true}))
	.use(serve(path.join(__dirname, '/public')))
	.use(router.routes())
	.use(router.allowedMethods());

const port = 6001;

console.log('Listening on port ', port);
app.listen(port);
