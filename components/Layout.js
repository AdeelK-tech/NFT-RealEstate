import React from "react";
import Head from "next/head";
import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Container>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          rel="stylesheet"
        />
      </Head>
      <Header></Header>
      {props.children}
    </Container>
  );
};
export default Layout;
