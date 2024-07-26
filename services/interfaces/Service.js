const { inputLogger, outputLogger } = require("../../modules/log");

class Service {
  constructor({ name }) {
    this.name = name;
  }
  inputLog(funcName, params) {
    return inputLogger(`[${this.name}]${funcName}`, params);
  }
  outputLog(funcName, params) {
    return outputLogger(`[${this.name}]${funcName}`, params);
  }
}

module.exports = Service;
