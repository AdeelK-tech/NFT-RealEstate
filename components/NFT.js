import {React,useState} from "react";
import { Image, Card, Button, Grid } from "semantic-ui-react";
import marketInstance from "../marketInstance";
import web3 from "../web3";
import Layout from "./Layout";
import nftInstance from "../nftInstance";
import { Router } from "../routes";

const NFT = ({ NFT }) => {
const [loading,setLoading]=useState(false)
const buyNFT=async()=>{
    setLoading(true)
    try{
        const accounts=await web3.eth.requestAccounts();
        await marketInstance.methods.buyItem(NFT.itemId,nftInstance._address).send({
            from:accounts[0],
            value:web3.utils.toWei(NFT.price,'ether')
        })
        Router.pushRoute('/nfts/market')
    }catch(error){
        console.log(error)
    }
setLoading(false)
}

  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Image src={NFT.image}></Image>
          <Card.Group>
            <Card fluid color="red" header={`Name: ${NFT.name}`} />
            <Card
              fluid
              color="orange"
              header={`Description: ${NFT.description}`}
            />
            <Card fluid color="yellow" header={`Price: ${NFT.price} ETH`} />
            <Card fluid color="green" header={`Seller: ${NFT.seller}`} />
          </Card.Group>
        </Grid.Row>
        <Grid.Row>
          <Button secondary onClick={buyNFT} loading={loading}>Buy Item</Button>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};
export default NFT;
