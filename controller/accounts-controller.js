const { StatusCodes } = require('http-status-codes');
const response = require(`../middlewares/response`);
const accountsService = require(`../services/accounts`);

const mint = async (req, res) => {
  try {
    let result = await accountsService.mint(req?.body, req?.jwt?.evmAddress);
    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const tokenUri = async (req, res) => {
  try {
    let result = await dhnService.tokenUri(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}


module.exports = {
  mint,
  tokenUri,
}