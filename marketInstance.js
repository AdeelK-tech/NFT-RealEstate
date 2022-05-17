import web3 from "./web3";
import market from "./artifacts/contracts/Market.sol/Market.json";
let marketInstance=new web3.eth.Contract(market.abi,'0x702BDa767C3f8e432DA0B47c0d2F18072aD4a317');
export default marketInstance;