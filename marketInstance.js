import web3 from "./web3";
import market from "./artifacts/contracts/Market.sol/Market.json";
let marketInstance=new web3.eth.Contract(market.abi,'0x44638D439b2F5E6c00dc5c224EE948ECbc2127d6');
export default marketInstance;