import web3 from './web3';
import nft from './artifacts/contracts/NFT.sol/NFT.json';
let nftInstance= new web3.eth.Contract(nft.abi,'0x9A6435040c017E3Af36F2cAB7ED7F99cc1219a20');
export default nftInstance;