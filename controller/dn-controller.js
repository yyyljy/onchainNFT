const { StatusCodes } = require('http-status-codes');
const response = require(`../middlewares/response`);
const ejs = require("ejs");
const path = require("path");

const dhnService = require(`../services/dn`);

const imageDefaultSet = async (req, res) => {
  try {
    let result = await dhnService.imageDefault(req);

    // 예외처리

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const imageByTokenId = async (req, res) => {
  try {
    let result = await dhnService.imageByTokenId(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const image = async (req, res) => {
  try {
    let result = await dhnService.image(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const insertMetadataByTokenId = async (req, res) => {
  try {
    let result = await dhnService.insertMetadataByTokenId(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const selectMetadataByTokenId = async (req, res) => {
  try {
    let result = await dhnService.selectMetadataByTokenId(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const deleteMetadata = async (req, res) => {
  try {
    let result = await dhnService.deleteMetadata(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

const mint = async (req, res) => {
  try {
    let result = await dhnService.mint(req?.body, req?.jwt?.evmAddress);
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
  imageDefaultSet,
  imageByTokenId,
  image,
  insertMetadataByTokenId,
  selectMetadataByTokenId,
  deleteMetadata,
  mint,
  tokenUri,
}