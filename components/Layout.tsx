import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "../styles/Layout.module.css";
import { ReactNode } from "react";
import Head from "next/head";

const { layout } = style;

type LayoutProps = { children?: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={layout}>
      <Head>
        <title>A la tempera : vente de peinture sur bois pour enfants</title>
        <meta
          name="description"
          content="Exposition et vente de peintures sur bois pour enfants réalisées à la tempera. Idéal pour un cadeaux ou décorer une chambre."
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
