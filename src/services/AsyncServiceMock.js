class AsyncServiceMock {
	constructor() {
		this.counter = 0;
	}

	doAsyncOperation() {
		const that = this;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (that.counter % 2 === 0) {
					that.counter++;
					resolve(true);
				}
				else {
					that.counter++;
					reject(false);
				}
			}, 500);
		});
	}
}

module.exports = AsyncServiceMock;
