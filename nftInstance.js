import web3 from './web3';
import nft from './artifacts/contracts/NFT.sol/NFT.json';
let nftInstance= new web3.eth.Contract(nft.abi,'0xD73095310630074afe08b01ce02e840F22C9D30a');
export default nftInstance;