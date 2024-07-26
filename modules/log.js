
const inputLogger = (functionName, param) => {
  console.log(`============== ${functionName}() INPUT ==============`);
  console.log(JSON.stringify(param));
  console.log(`=====================================================`);
};

const outputLogger = (functionName, error, data) => {
  if (error) {
    console.error(`!!!!!!!!!!!!! ${functionName}() OUTPUT !!!!!!!!!!!!!`);
    console.error(JSON.stringify(error));
    let msg = error.details;
    if (Object.keys(RELAY_ERROR_MESSAGE).includes(msg)) {
      msg = RELAY_ERROR_MESSAGE[msg];
      console.error(msg);
    }
    console.error(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    return new Error(msg);
  } else {
    console.log(`============== ${functionName}() OUTPUT ==============`);
    console.log(JSON.stringify(data));
    console.log(`=====================================================`);
    return data;
  }
}

module.exports = {
  inputLogger,
  outputLogger
}