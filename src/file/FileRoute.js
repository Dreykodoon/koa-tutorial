const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const router = new Router();
const appDir = path.dirname(require.main.filename);

router.post('/', (ctx, next) => {
	const saveFile = (file) => {
		const reader = fs.createReadStream(file.path);
		const fileName = file.name ? file.name : Math.random().toString();
		const stream = fs.createWriteStream(path.join(appDir, '/public', fileName));
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

module.exports = router;