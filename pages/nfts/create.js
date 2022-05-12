import React from "react";
import { Form, Input,Grid} from "semantic-ui-react";
import Layout from "../../components/Layout";
import Image from "next/image";
const createNFT = () => {
  return (
    <Layout>
      <h2>Create an NFT</h2>
      <Grid colunms={2}>
        <Grid.Row>
        <Grid.Column width={8}>
      <Form>
        <Form.Field>
          <label style={{ fontSize: "large" }}>Name</label>
          <Input style={{width:'500px'}}></Input>
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "large" }}>Name</label>
          <Input style={{width:'500px'}}></Input>
        </Form.Field>
        <Form.Field>
          <label style={{ fontSize: "large" }}>Upload Image</label>
          <Input style={{width:'500px'}} type='file'></Input>
        </Form.Field>
      </Form>
      </Grid.Column>
      <Grid.Column width={8}>
        <Image src='/image_1.png' width={`${500}px`} height={`${500}px`}></Image>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    </Layout>
  );
};
export default createNFT;
