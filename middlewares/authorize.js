const jwt = require('./jwt');
const { StatusCodes } = require('http-status-codes');
const response = require('../middlewares/response');
const responseMessage = require('../modules/responseMessage')

const checkAuthorization = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).send(response.CustomError('error'));
  }

  const token = authorization;
  const jwtToken = await jwt.verify({ token });

  // 유효기간 만료
  if (jwtToken === jwt.TOKEN_EXPIRED)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.CustomError('error'));
  // 유효하지 않는 토큰
  if (jwtToken === jwt.TOKEN_INVALID)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.CustomError('error'));
  if (jwtToken.id === undefined)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.CustomError('error'));

  req.jwt = jwtToken

  next();
}

module.exports = {
  checkAuthorization,
}