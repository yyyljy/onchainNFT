const { StatusCodes } = require('http-status-codes');
const response = require(`../middlewares/response`);
const ejs = require("ejs");
const path = require("path");

const authService = require(`../services/auth`);

const login = async (req, res, next) => {
  try {
    let result = await authService.login(req);

    return res.status(StatusCodes.OK).json(response.Success('data_info', result));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(response.CustomError(e));
  }
}

module.exports = {
  login,
}