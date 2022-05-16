const { ethers } = require("hardhat");

async function main() {
const NFTMARKET= await ethers.getContractFactory('Market');
const nftMarket=await NFTMARKET.deploy();
const NFT= await ethers.getContractFactory('NFT');
const nft=await NFT.deploy(nftMarket.address);
console.log('market address:',nftMarket.address)
console.log('nft address:',nft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
