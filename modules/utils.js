const fs = require('fs');

// Function Result
function decodeFunctionResult(abi, functionName, resultAsBytes) {
  const functionAbi = abi.find((func) => func.name === functionName);
  const functionParameters = functionAbi.outputs;
  const resultHex = "0x".concat(Buffer.from(resultAsBytes).toString("hex"));
  const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
  return result;
}

// 필수 입력 값의 유효성을 검증하는 함수
function validateParams(request) {
  try {
    if (!Array.isArray(request)) {
      throw new Error(`validateParams : request type error`);
    }
    console.log(`request value`);
    console.log(request);
    request.map((value, index) => {
      if (typeof value === "string") {
        if (value.length <= 0)
          throw new Error(`validateParams : param[${index}] length error`);
      } else if (Array.isArray(value)) {
        if (value.length <= 0)
          throw new Error(`validateParams : param[${index}] length error`);
      } else {
        if (value <= 0) {
          throw new Error(
            `validateParams : param[${index}]_${value} non-zero error`
          );
        }
      }
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return new Error(RELAY_ERROR_MESSAGE.INVALID_INPUT_PARAMETER);
  }
}

function imageToBytes32Array(fileName) {

  const data = fs.readFileSync(`${process.env.PWD}/${fileName}`);

  // 이미지 데이터를 Base64 문자열로 변환합니다.
  const base64 = data.toString('base64');

  // Base64 문자열을 bytes32 배열로 변환합니다.
  const bytes32Array = [];
  for (let i = 0; i < base64.length; i += 32) {
    bytes32Array.push(`${base64.slice(i, i + 32)}`);
  }

  console.log("Bytes32 Array length:", bytes32Array.length);
  // console.log(bytes32Array);
  return bytes32Array;
}

function bytes32ArrayToImage(bytes32Array, fileName) {
  const restoredBase64 = bytes32Array.join('');
  const restoredData = Buffer.from(restoredBase64, 'base64');
  fs.writeFileSync(`${fileName}`, restoredData);
}

module.exports = {
  decodeFunctionResult: decodeFunctionResult,
  validateParams: validateParams,
  imageToBytes32Array,
  bytes32ArrayToImage
};
