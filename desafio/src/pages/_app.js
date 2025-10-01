import "@/styles/globals.css";
import BottomNav from "../components/BottomNav";

import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
      <BottomNav />
    </div>
  );
}
