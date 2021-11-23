const { pool } = require("../../../config/database");
const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
	if (!email) {
		const connection = await pool.getConnection(async conn => conn);
		const userListResult = await userDao.selectUser(connection);
		connection.release();

		return userListResult;
	}
	const connection = await pool.getConnection(async conn => conn);
	const userListResult = await userDao.selectUserEmail(connection, email);
	connection.release();

	return userListResult;
};

exports.retrieveUser = async function (userId) {
	const connection = await pool.getConnection(async conn => conn);
	const userResult = await userDao.selectUserId(connection, userId);

	connection.release();

	return userResult[0];
};

exports.emailCheck = async function (email) {
	const connection = await pool.getConnection(async conn => conn);
	const emailCheckResult = await userDao.selectUserEmail(connection, email);
	connection.release();

	return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
	const connection = await pool.getConnection(async conn => conn);
	const passwordCheckResult = await userDao.selectUserPassword(connection, selectUserPasswordParams);
	connection.release();
	return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
	const connection = await pool.getConnection(async conn => conn);
	const userAccountResult = await userDao.selectUserAccount(connection, email);
	connection.release();

	return userAccountResult;
};

exports.phoneNumberCheck = async function (phoneNumber) {
	const connection = await pool.getConnection(async conn => conn);
	const userAccountResult = await userDao.selectUserPhoneNumber(connection, phoneNumber);
	connection.release();

	return userAccountResult;
};

exports.nickNameCheck = async function (nickName) {
	const connection = await pool.getConnection(async conn => conn);
	const userNickNameResult = await userDao.selectUserNickName(connection, nickName);
	connection.release();
	return userNickNameResult;
};

exports.refreshTokenCheck = async function (token) {
	const connection = await pool.getConnection(async conn => conn);
	const userTokenResult = await userDao.selectUserToken(connection, token);
	connection.release();

	return userTokenResult;
};
