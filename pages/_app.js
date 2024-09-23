import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from "react-redux";
import store from '@store/index';
import { CookieThemeProvider } from "@lidofinance/lido-ui";
import '@styles/index.scss';
import WalletProvider from '@wallets/WalletProvider'
import { EXPLORER_HOST_ETH, EXPLORER_HOST_POLYGON } from "@config/env";
import '../globals.css';
export const runtime = 'experimental-edge';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // 默认网络放到localStorage存储
  window.localStorage.setItem("EXPLORER_HOST", EXPLORER_HOST_POLYGON);
  }, []);

  return (
    <>
      <Head>
        <title>VGod Not VDog</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <Provider store={store}>
        <CookieThemeProvider overrideThemeName={'dark'}>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
        </CookieThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
