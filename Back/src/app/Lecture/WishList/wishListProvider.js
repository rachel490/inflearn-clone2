const { pool } = require("../../../../config/database");
const wishListDao = require("./wishListDao");

exports.selectUserWishList = async function (userId) {
	const connection = await pool.getConnection(async conn => conn);

	const resultRows = await wishListDao.selectWishList(connection, userId);

	return resultRows;
};

exports.selectWishListItems = async function (wishListId) {
	const connection = await pool.getConnection(async conn => conn);

	const resultRows = await wishListDao.selectWishListItems(connection, wishListId);

	return resultRows;
};

exports.checkWishListItem = async function (lectureId, wishListId) {
	const connection = await pool.getConnection(async conn => conn);

	const resultRows = await wishListDao.selectWishListItem(connection, lectureId, wishListId);

	return resultRows;
};
