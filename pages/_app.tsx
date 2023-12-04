import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </StateContext>
    </SessionProvider>
  );
}
