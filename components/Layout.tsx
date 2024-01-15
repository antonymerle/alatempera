import { Montserrat } from "next/font/google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "../styles/Layout.module.css";
import { ReactNode } from "react";
import Head from "next/head";

const { layout } = style;

type LayoutProps = { children?: ReactNode };

const font = Montserrat({ subsets: ["latin"] });

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={font.className}>
      <div className={layout}>
        <Head>
          <title>A la tempera : vente de peinture sur bois pour enfants</title>
          <meta
            name="description"
            content="Exposition et vente de peintures sur bois pour enfants réalisées à la tempera. Idéal pour un cadeau ou décorer une chambre."
          />
        </Head>
        <Navbar />
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
