const wishListProvider = require("./wishListProvider");
const wishListService = require("./wishListService");
const baseResponse = require("../../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../../config/response");

exports.postWishListItem = async function (req, res) {
	const token = req.verifiedToken;

	const { userId } = token;

	const { lectureId } = req.body;

	let wishListId;

	const wishListCheckRows = await wishListProvider.selectUserWishList(userId);

	if (wishListCheckRows.length < 1) {
		wishListId = await wishListService.createWishList(userId);
	} else {
		wishListId = wishListCheckRows[0].WISH_LIST_ID;
	}

	const insertResult = await wishListService.insertWishListItem(wishListId, lectureId);

	return res.send(insertResult);
};

exports.getWishListItem = async function (req, res) {
	const token = req.verifiedToken;

	const { userId } = token;

	const wishListCheckRows = await wishListProvider.selectUserWishList(userId);

	if (wishListCheckRows.length < 1) return res.send(errResponse(baseResponse.USER_WISH_LIST_NOT_EXIST));

	const wishListId = wishListCheckRows[0].WISH_LIST_ID;

	const selectResult = await wishListProvider.selectWishListItems(wishListId);

	return res.send(response(baseResponse.SUCCESS("위시리스트 조회에 성공하였습니다"), selectResult));
};

exports.deleteWishListItem = async function (req, res) {
	const token = req.verifiedToken;

	const { userId } = token;

	const { lectureId } = req.body;

	const wishListCheckRows = await wishListProvider.selectUserWishList(userId);

	if (wishListCheckRows.length < 1) return res.send(errResponse(baseResponse.USER_WISH_LIST_NOT_EXIST));

	const wishListId = wishListCheckRows[0].WISH_LIST_ID;

	const checkResult = await wishListProvider.checkWishListItem(lectureId, wishListId);

	if (checkResult.length < 1) return res.send(errResponse(baseResponse.USER_WISH_LIST_ITEM_NOT_EXIST));

	const deleteResult = await wishListService.deleteWishListItem(wishListId, lectureId);

	return res.send(deleteResult);
};
