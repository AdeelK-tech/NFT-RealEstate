require("@nomiclabs/hardhat-waffle");
ALCHEMY_API_KEY='7NyYdQMrOE0V5RougtULnTPyC1fL_Bbf'
RINKEBY_PRIVATE_KEY='8dd9a1413df575220c56e07aa6954e21de61129d9ebc5a89816513cc86fa0167'
module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
