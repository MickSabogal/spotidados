// pages/top100.js
import { Home, Edit, Users } from ''
import { useState } from 'react'
import link from 'next/link'




export default function Home() {
const songs = [
    "Coldplay - Viva La Vida",
    "Shakira - Hips Don’t Lie",
    "Ed Sheeran - Shape of You",
    "Adele - Rolling in the Deep",
    "The Weeknd - Blinding Lights",
    "Michael Jackson - Billie Jean",
    "Rihanna - Diamonds",
    "Dua Lipa - Don’t Start Now",
    "Bruno Mars - Uptown Funk",
];

return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Header */}
    <h1 className="text-2xl font-bold mb-6">Top 100 Songs</h1>

      {/* Time Filter Buttons */}
    <div className="flex gap-2 mb-6">
        <button className="px-3 py-1 rounded-full bg-green-600 text-sm">Último mês</button>
        <button className="px-3 py-1 rounded-full bg-gray-700 text-sm">6 meses</button>
        <button className="px-3 py-1 rounded-full bg-purple-600 text-sm">1 ano</button>
        <button className="px-3 py-1 rounded-full bg-gray-700 text-sm">Desde sempre</button>
    </div>

      {/* Songs List */}
    <div className="w-[90%] max-w-md space-y-3">
        {songs.map((song, index) => (
        <div
            key={index}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium tracking-wide"
        >
            {song}
        </div>
        ))}
    </div>

      {/* Bottom Navigation */}
    <div className="p-4 flex justify-around items-center border-t border-gray-800 bg-[#0f0f0f]/70 backdrop-blur-sm fixed bottom-0 w-full">
            <Link href="/">
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
                <Home className="w-6 h-6" />
                <span className="text-xs">Início</span>
            </button>
            </Link>

            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <Edit className="w-6 h-6" />
            <span className="text-xs">Buscar</span>
            </button>

            <button className="flex flex-col items-center gap-1 bg-gradient-to-r from-[#1DB954] to-[#12a94a] text-white rounded-full p-3 hover:opacity-95 transition">
            <Users className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
            </button>
        </div>
    </div>
);
}
