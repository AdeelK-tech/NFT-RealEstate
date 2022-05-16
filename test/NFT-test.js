const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Testing contract', () => {
  let contract;
  let nftContract;
  let marketContract;
  let owner;
  let addr1;
   beforeEach(async() => {
     [owner,addr1]=await ethers.getSigners();
     contract= await ethers.getContractFactory('NFT');
     marketContract=await (await ethers.getContractFactory('Market')).deploy()
      nftContract=await contract.deploy(marketContract.address);
    address =nftContract.address;
    
    });

    describe('Testing createToken', () => {
      it('should pass',async () => {
      await nftContract.createToken("ipfs://cid1");
      await nftContract.createToken("ipfs://cid2");
      await nftContract.createToken("ipfs://cid3");
      await marketContract.connect(owner).createItem(1,1000000000000000000n,nftContract.address);
      await marketContract.createItem(2,2000,nftContract.address);
      await marketContract.createItem(3,2000,nftContract.address);
      expect(await nftContract.ownerOf(1)).to.equal(marketContract.address)
      await marketContract.connect(addr1).buyItem(1,nftContract.address,{value:100000000000000000n})
      expect (await nftContract.ownerOf(1)).to.equal(addr1.address)
      const items=await marketContract.connect(addr1).fetchMyNfts();
      console.log(items)
      const itemsCreated=await marketContract.connect(addr1).getCreatedItems();
      console.log(itemsCreated)
    
        
        
      });
    });
});
