
// pages/top100.js
import { Home, Edit, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Top100() {
const [activeFilter, setActiveFilter] = useState("month");

const songs = [
    "Coldplay - Viva La Vida",
    "Shakira - Hips Don't Lie",
    "Ed Sheeran - Shape of You",
    "Adele - Rolling in the Deep",
    "The Weeknd - Blinding Lights",
    "Michael Jackson - Billie Jean",
    "Rihanna - Diamonds",
    "Dua Lipa - Don't Start Now",
    "Bruno Mars - Uptown Funk",
];

return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Header */}
    <h1 className="text-2xl font-bold mb-6">Top 100 Songs</h1>

      {/* Time Filter Buttons */}
    <div className="flex gap-2 mb-6">
        <button
        onClick={() => setActiveFilter("month")}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            activeFilter === "month"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        Último mês
        </button>
        <button
        onClick={() => setActiveFilter("6months")}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            activeFilter === "6months"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        6 meses
        </button>
        <button
        onClick={() => setActiveFilter("1year")}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            activeFilter === "1year"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        1 ano
        </button>
        <button
        onClick={() => setActiveFilter("alltime")}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            activeFilter === "alltime"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        Desde sempre
        </button>
    </div>

      {/* Songs List */}
    <div className="w-[90%] max-w-md space-y-3 mb-24">
        {songs.map((song, index) => (
        <div
            key={index}
            className="group relative bg-gray-900 px-4 py-3 rounded-lg font-medium tracking-wide flex justify-between items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-purple-600/60 cursor-pointer border border-transparent hover:border-purple-500/30"
        >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-purple-100">
            {index + 1}. {song}
            </span>
            {/* Play icon on hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-400 transform group-hover:scale-110">
            ▶
            </span>
            {/* Purple glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-purple-500/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-purple-500/10 group-hover:to-purple-600/20 transition-all duration-300 pointer-events-none"></div>
        </div>
        ))}
    </div>
    </div>
);
}