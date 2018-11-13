class UserDAO {
	constructor() {
		this.userNameList = ['Mihai', 'Adi', 'Mniezo'];
	}

	userExists(name) {
		return this.userNameList.indexOf(name) !== -1;
	}
}

module.exports = new UserDAO();
