import "@/styles/globals.css";

import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
      <h1>teste</h1>
    </div>
  )
}