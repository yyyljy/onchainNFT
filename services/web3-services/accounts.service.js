const ContractService = require("../../interfaces/ContractService");
const ACCOUNTS_CONTRACT_NAME = process.env.ACCOUNTS_CONTRACT_NAME;
const ACCOUNTS_CONTRACT_ADDRESS = process.env.ACCOUNTS_CONTRACT_ADDRESS;
class AccountsService extends ContractService {
    constructor() {
        super(ACCOUNTS_CONTRACT_NAME,ACCOUNTS_CONTRACT_ADDRESS);
    }
}

 module.exports = AccountsService;