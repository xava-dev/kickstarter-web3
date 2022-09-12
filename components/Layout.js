import React from "react";
import { Container} from "semantic-ui-react";
import Header from "./header";
import 'semantic-ui-css/semantic.min.css';
import Head from "next/head";

const Layout = (props) => {
    return (
        <>
        <Head >
            <title>Kickstarter Web3</title>
            <link rel="icon" href="/favicon.png" type="favicon.ico" />
        </Head>
        <Container>
            <Header/>
            {props.children}
        </Container>
        </>
    )
};

export default Layout;