const paymentProvider = require("./paymentProvider");
const paymentService = require("./paymentService");
const baseResponse = require("../../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../../config/response");

exports.getCarts = async function (req, res) {
	const token = req.verifiedToken;
	const { userId } = token;

	const getCartsItemResult = await paymentProvider.getCartsItem(userId);

	return res.send(response(baseResponse.SUCCESS("수강 바구니 조회에 성공했습니다"), getCartsItemResult));
};

exports.deleteItems = async function (req, res) {
	const token = req.verifiedToken;
	const { userId } = token;
	const { lectureId } = req.params;

	if (!lectureId) return res.send(errResponse(baseResponse.LECTURE_ID_EMPTY));

	const deleteCartItemsResult = await paymentService.deleteCartItem(userId, lectureId);

	return res.send(deleteCartItemsResult);
};

exports.addItem = async function (req, res) {
	const token = req.verifiedToken;
	const { userId } = token;
	const { lectureId } = req.params;

	if (!lectureId) return res.send(errResponse(baseResponse.LECTURE_ID_EMPTY));

	const postCartItemResult = await paymentService.postCartItem(userId, lectureId);

	return res.send(postCartItemResult);
};

exports.getReceipt = async function (req, res) {
	const token = req.verifiedToken;
	const { userId } = token;

	const getReceipt = await paymentProvider.getReceiptHistory(userId);

	return res.send(getReceipt);
};

exports.deleteReceipt = async function (req, res) {
	const token = req.verifiedToken;
	const { userId } = token;
	const userBuyId = req.params.buyId;

	const deleteReceipt = await paymentService.deleteReceipt(userId, userBuyId);

	return res.send(deleteReceipt);
};
