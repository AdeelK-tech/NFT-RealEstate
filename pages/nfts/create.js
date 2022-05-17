import { React, useState } from "react";
import { Form, Input, Grid, Button, Message, Icon } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { create as ipfsHttpClient } from "ipfs-http-client";
import marketInstance from "../../marketInstance";
import nftInstance from "../../nftInstance";
import web3 from "../../web3";
import { Router } from "../../routes";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const createNFT = () => {
  const [fileURL, setFileURL] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const desChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileURL(url);
    } catch (error) {
      console.log(error);
    }
  };
  //function to save metadata on ipfs
  const saveItemData = async () => {
    if (!price || !name || !fileURL) {
      return;
    }
    const data = JSON.stringify({
      name,
      description,
      image: fileURL,
    });
    setLoading(true);
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createMarketItem(url);
    } catch (error) {
      console.log(error);
    }
  };
  //function to create item on chain
  const createMarketItem = async (tokenURI) => {
    const accounts = await web3.eth.requestAccounts();

    const tx = await nftInstance.methods.createToken(tokenURI).send({
      from: accounts[0],
    });
    const tokenId = tx.events.Transfer.returnValues.tokenId;
    const priceInWei = web3.utils.toWei(price, "ether");
    await marketInstance.methods
      .createItem(tokenId, priceInWei, nftInstance._address)
      .send({
        from: accounts[0],
      });
    setLoading(false);
    Router.pushRoute("/nfts/market");
    console.log("created");
  };
  return (
    <Layout>
      <h2>
        <u>Create an NFT</u>
      </h2>
      <Grid colunms={2}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form onSubmit={saveItemData}>
              <Form.Field>
                <label style={{ fontSize: "large" }}>Name of Property</label>
                <Input
                  style={{ width: "500px" }}
                  value={name}
                  onChange={nameChangeHandler}
                  required
                ></Input>
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: "large" }}>Description</label>
                <Input
                  style={{ width: "500px" }}
                  value={description}
                  onChange={desChangeHandler}
                  required
                ></Input>
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: "large" }}>
                  Upload Property Image
                </label>
                <Input
                  style={{ width: "500px" }}
                  type="file"
                  onChange={fileChangeHandler}
                  required
                ></Input>
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: "large" }}>Price</label>
                <Input
                  style={{ width: "500px" }}
                  label="ETH"
                  labelPosition="right"
                  value={price}
                  onChange={priceChangeHandler}
                  required
                ></Input>
              </Form.Field>
              <Button secondary content="Create" loading={loading}></Button>
            </Form>
            <Message warning>
              <Message.Header>Note:</Message.Header>
              <p>
                You have to sign two transactions to create an NFT, So please be
                patient you will be routed to market once your NFT is created.{" "}
                <Icon name="hand peace"></Icon>
              </p>
            </Message>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image
              src="/image_1.png"
              width={`${600}px`}
              height={`${600}px`}
            ></Image>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};
export default createNFT;
