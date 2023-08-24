import Head from "next/head";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
export default MyApp;
