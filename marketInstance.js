import web3 from "./web3";
import market from "./artifacts/contracts/Market.sol/Market.json";
let marketInstance=new web3.eth.Contract(market.abi,'0xEAC9370Fd8cA2c9f79F721A6e54D2c8b918d4Fb7');
export default marketInstance;