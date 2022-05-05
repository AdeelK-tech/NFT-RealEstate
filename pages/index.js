import Layout from "../components/Layout";
import { Button, Grid } from "semantic-ui-react";
import {Link} from '../routes'
export default function Home() {
  return (
    <Layout>
      <h2><u>LATEST NEWS RELATED TO NFTS</u></h2>
      <Link route='/nfts/create'>
      <a>
      <Button
        floated="right"
        content="createNFT"
        icon="add circle"
        secondary
      >
      </Button>
      </a>
      </Link>
    </Layout>
  );
}
