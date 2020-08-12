import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

function Layout({ children, user }) {
  return (
    <React.Fragment>
      {/* <Head>
        <HeadContent />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>Next.js with JWT auth and Cookie</title>
      </Head> */}
      <Header user={user}></Header>
      <Container text style={{ paddingTop: "1em" }}>
        {children}
      </Container>
    </React.Fragment>
  );
}

export default Layout;
