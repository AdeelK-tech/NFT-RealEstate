import { React, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button, Header, Statistic, Icon } from "semantic-ui-react";
import { Link } from "../routes";
import Image from "next/image";
import "../styles/Home.module.css";
import marketInstance from "../marketInstance";

function Home() {
  const [createdItems, setCreatedItems] = useState(0);
  const [soldItems, setSoldItems] = useState(0);
  const getStats = async () => {
    const createdItems = await marketInstance.methods
      .get_noOfCreatedItems()
      .call();
    console.log(createdItems);
    const soldItems = await marketInstance.methods.get_noOfSoldItems().call();
    setCreatedItems(createdItems);
    setSoldItems(soldItems);
  };
  useEffect(() => {
    getStats();
  }, []);
  return (
    <Layout>
      <Header
        as="h1"
        dividing
        style={{ fontSize: "35px", color: "white", fontFamily: "tahoma" }}
      >
        A DECENTRALIZED REAL ESTATE NFT MARKETPLACE.
      </Header>
      <Image src="/image_2.png" width={`${850}px`} height={`${350}px`}></Image>

      <Link route="/nfts/create">
        <a>
          <Button
            floated="right"
            content="createNFT"
            icon="add circle"
            secondary
          ></Button>
        </a>
      </Link>
      <div style={{ marginTop: "150px" }}>
        <Statistic.Group color="grey">
          <Statistic>
            <Statistic.Value>{createdItems}</Statistic.Value>
            <Statistic.Label>NFTS CREATED</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{soldItems}</Statistic.Value>
            <Statistic.Label>NFTS SOLD</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>
          Our fees 0.00005 ETH on each Market Sale <Icon name="like"></Icon>
        </h3>
      </div>
    </Layout>
  );
}
export default Home;
