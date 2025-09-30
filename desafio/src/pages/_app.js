import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
      <Navbar />
    </div>
  )
}