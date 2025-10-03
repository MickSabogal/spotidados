import "@/styles/globals.css";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/router";

import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Não mostra navbar na página index
  const mostrarNav = router.pathname !== "/";

  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
      {mostrarNav && <BottomNav />}
    </div>
  );
}
