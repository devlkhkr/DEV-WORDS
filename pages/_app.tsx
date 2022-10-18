import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
  overflow: hidden;
`;

const Wrap = styled.div`
  max-width: 720px;
  min-width: 360px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ComponentWrap = styled.div<any>`
  height: calc(100% - var(--height-header) - var(--height-footer));
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Copublish IT Dictionary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* body */}
      <Wrapper>
        <Wrap>
          <Header />

          {/* content */}
          <ComponentWrap
            style={router.pathname == "/" ? { overflow: "hidden" } : {}}
          >
            <Component {...pageProps} />
          </ComponentWrap>

          <Footer />
        </Wrap>
      </Wrapper>
    </>
  );
}

export default MyApp;
