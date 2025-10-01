import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, SquarePen } from "lucide-react";
import dadosHistory from "../data/history.json";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  // calcular top artists a partir do history.json
  const artistCounts = {};
  dadosHistory.forEach((item) => {
    const name =
      item.master_metadata_album_artist_name ||
      item.artistName ||
      item.master_metadata_track_artist_name ||
      null;
    if (!name) return;
    artistCounts[name] = (artistCounts[name] || 0) + 1;
  });
  const artistName = "Eminem"; // Valor padrão para a imagem
  const topArtists = Object.entries(artistCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((a, i) => ({ id: i + 1, ...a }));

  const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md pb-24">
        {/* Header con búsqueda */}
       <SearchBar />

        {/* Top Artist of this Month - agora usando dados do history.json */}
        <div className="px-4 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold whitespace-nowrap">
              Top Artist of this Month
            </h2>
            <div className="h-px flex-1 bg-gray-700"></div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {topArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artist?name=${encodeURIComponent(artist.name)}`}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={
                        artist.name === "Eminem"
                          ? "/eminem.jpg"
                          : artist.name === "Kendrick Lamar"
                          ? "/kendrick.jpg"
                          : artist.name === "TOOL"
                          ? "/tool.jpg"
                          : artist.name === "System Of A Down"
                          ? "/System.jpg"
                          : artist.name === "J. Cole"
                          ? "/jcole.jpg"
                          : artist.name === "Earl Sweatshirt"
                          ? "/earl.jpg"
                          : artist.name === "BROCKHAMPTON"
                          ? "/brock.jpg"
                          : artist.name === "Vince Staples"
                          ? "/vince.jpg"
                          : artist.name === "Kanye West"
                          ? "/kanye.jpeg"
                          : artist.name === "Slow J"
                          ? "/slowj.jpg"
                          : "/default.png"
                      }
                      alt="Artist"
                      fill
                      className="rounded-b-3xl object-cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-center max-w-[5.5rem] truncate">
                  {artist.name}
                </p>
                <p className="text-xs text-gray-400">
                  {fmt(artist.count)} plays
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Play */}
        <div className="px-4 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold whitespace-nowrap">
              Recently Play
            </h2>
            <div className="h-px flex-1 bg-gray-700"></div>
          </div>

          {/* Card de Wrapped 2024 */}
          <Link href="/estatisticas" className="block">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500 via-orange-500 to-red-600 p-8 cursor-pointer transition-all duration-300 hover:brightness-110">
              <div className="absolute top-6 left-6 w-24 h-24 bg-pink-600/60 rounded-2xl transform -rotate-12"></div>
              <div className="absolute bottom-6 right-6 w-40 h-40 border-8 border-red-400/40 rounded-3xl transform rotate-45"></div>

              <div className="relative z-10 text-center py-12">
                <h3 className="text-4xl font-bold mb-3">Your 2024 Wrapped</h3>
                <p className="text-white/90 mb-8 text-lg">
                  Jump into your year in audio.
                </p>
                <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold px-10 py-3 rounded-full transition-colors">
                  Let&apos;s go
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Botón para ver todos los artistas */}
        <div className="px-4 mt-4 mb-20">
          <Link href="/top100Songs">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors">
              See the most played songs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
