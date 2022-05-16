import web3 from './web3';
import nft from './artifacts/contracts/NFT.sol/NFT.json';
let nftInstance= new web3.eth.Contract(nft.abi,'0x11F0E7871756Ea39b763FeCAcD09C6fdC20E56Fa');
export default nftInstance;