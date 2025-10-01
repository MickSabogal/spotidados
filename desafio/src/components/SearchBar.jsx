import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      {/* Foto de perfil */}
      <Link href="/perfil">
          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden flex-shrink-0 relative">
            <Image src="/cb.jpg" alt="Profile" fill className="object-cover" />
          </div>
      </Link>
      
      {/* Barra de busca com tema da navbar */}
      <div className="flex-1 flex items-center gap-2 bg-[#0f0f0f]/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-800 shadow">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Song, album, artist, etc"
          className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
}