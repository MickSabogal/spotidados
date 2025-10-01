import { Home, Edit, Users } from "lucide-react";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-2 z-30">
      <div className="p-4 flex justify-around items-center border-t border-gray-800 bg-[#0f0f0f]/90 backdrop-blur-sm rounded-xl shadow">
        <Link href="/">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <Home className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </button>
        </Link>

        <Link href="/search">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <Edit className="w-6 h-6" />
            <span className="text-xs">Buscar</span>
          </button>
        </Link>

        <Link href="/profile">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <Users className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}