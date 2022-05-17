import React from "react";
import Layout from "./Layout";
import { Card, Loader } from "semantic-ui-react";

const Assets = ({ assets, loading }) => {
  const displayItems = assets.map((nft, i) => {
    return {
      image: nft.image,
      header: nft.name,
      meta: `Price: ${nft.price} ETH`,
      description: nft.description,
      extra: "",
    };
  });

  console.log(displayItems);

  return (
    <Layout>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Card.Group items={displayItems}></Card.Group>
      )}
    </Layout>
  );
};
export default Assets;
