import Layout from "../components/Layout";
import { Button, Grid } from "semantic-ui-react";

export default function Home() {
  return (
    <Layout>
      <h2><u>LATEST NEWS RELATED TO NFTS</u></h2>
      <Button
        floated="right"
        content="createNFT"
        icon="add circle"
        secondary
      ></Button>
    </Layout>
  );
}
