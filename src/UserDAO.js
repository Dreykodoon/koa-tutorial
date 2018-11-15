class UserDAO {
	constructor() {
		this.userNameList = ['Mihai', 'Adi', 'Mniezo'];
	}

	createUser(name) {
		this.userNameList.push(name);
		return `User ${name} created successfully!`;
	}

	userExists(name) {
		return this.userNameList.indexOf(name) !== -1;
	}

	getAllUsers() {
		return this.userNameList;
	}

	deleteUser(name) {
		const userIndex = this.userNameList.indexOf(name);
		if (userIndex === -1) {
			return 'User not found';
		}

		this.userNameList.splice(userIndex, 1);
		return `User ${name} deleted successfully`;
	}
}

module.exports = new UserDAO();
