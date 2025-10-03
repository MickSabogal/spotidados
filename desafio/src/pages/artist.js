// pages/artist.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArtistCard from "@/components/ArtistCard";
import BottomNav from "@/components/BottomNav";
import dadosHistory from "../data/history.json";
import Image from "next/image";

export default function ArtistPage() {
  const router = useRouter();
  const queryName = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name;

  const [artistName, setArtistName] = useState(
    typeof queryName === "string" ? decodeURIComponent(queryName) : "Eminem"
  );
  const [totalPlays, setTotalPlays] = useState(0);

  // Atualiza artistName quando a query mudar
  useEffect(() => {
    if (!router.isReady) return;
    const nameParam = Array.isArray(router.query.name)
      ? router.query.name[0]
      : router.query.name;
    setArtistName(nameParam ? decodeURIComponent(nameParam) : "Eminem");
  }, [router.isReady, router.query.name]);

  // Calcula plays totais do histórico
  useEffect(() => {
    if (Array.isArray(dadosHistory)) {
      setTotalPlays(dadosHistory.length);
    }
  }, []);

  if (!artistName) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex flex-col items-center pb-24">
      {/* Imagem do artista */}
      <div className="relative w-full max-w-md h-72 overflow-hidden rounded-b-3xl">
        <Image
          src={
            artistName === "Eminem"
              ? "/eminem.jpg"
              : artistName === "Kendrick Lamar"
              ? "/kendrick.jpg"
              : artistName === "TOOL"
              ? "/tool.jpg"
              : artistName === "System Of A Down"
              ? "/System.jpg"
              : artistName === "J. Cole"
              ? "/jcole.jpg"
              : artistName === "Earl Sweatshirt"
              ? "/earl.jpg"
              : artistName === "BROCKHAMPTON"
              ? "/brock.jpg"
              : artistName === "Vince Staples"
              ? "/vince.jpg"
              : artistName === "Kanye West"
              ? "/kanye.jpeg"
              : artistName === "Slow J"
              ? "/slowj.jpg"
              : "/default.png"
          }
          alt={artistName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-white text-4xl font-bold tracking-tight">
            {artistName.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Card com estatísticas + Top 20 */}
      <ArtistCard artistName={artistName} totalPlays={totalPlays} />

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
