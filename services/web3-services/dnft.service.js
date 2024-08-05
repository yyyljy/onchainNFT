const ContractService = require("../../interfaces/ContractService");
const DNFT_CONTRACT_NAME = process.env.DNFT_CONTRACT_NAME;
const DNFT_CONTRACT_ADDRESS = process.env.DNFT_CONTRACT_ADDRESS;
class DnftService extends ContractService {
    constructor() {
        super(DNFT_CONTRACT_NAME,DNFT_CONTRACT_ADDRESS);
    }

    
}

 module.exports = DnftService;