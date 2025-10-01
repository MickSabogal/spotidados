
// pages/top100.js
import { Home, Edit, Users, Play } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dadosHistory from "../data/history.json";

export default function Top100() {
const [activeFilter, setActiveFilter] = useState("month");
const [topSongs, setTopSongs] = useState([]);

  // Process history data based on active filter
useEffect(() => {
    const processHistory = () => {
      // Count song plays
    const songCounts = {};
    dadosHistory.forEach((entry) => {
        // Check if it's a song (not a podcast)
        if (entry.master_metadata_track_name && entry.master_metadata_album_artist_name) {
        const songKey = `${entry.master_metadata_album_artist_name} - ${entry.master_metadata_track_name}`;
        songCounts[songKey] = (songCounts[songKey] || 0) + 1;
        }
    });

      // Convert to array and sort by play count
    const sortedSongs = Object.entries(songCounts)
        .map(([song, count]) => ({ song, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 100); // Top 100

    setTopSongs(sortedSongs);
    };

    processHistory();
}, [activeFilter]);

const handleSongClick = (song) => {
    console.log("Playing:", song);
    // Add your play logic here
    alert(`Now playing: ${song}`);
};

return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Header */}
    <h1 className="text-2xl font-bold mb-6">Top 100 Songs</h1>

      {/* Time Filter Buttons */}
    <div className="flex gap-2 mb-6">
        <button
        onClick={() => setActiveFilter("month")}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 min-w-[110px] ${
            activeFilter === "month"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        Último mês
        </button>
        <button
        onClick={() => setActiveFilter("6months")}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 min-w-[110px] ${
            activeFilter === "6months"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        6 meses
        </button>
        <button
        onClick={() => setActiveFilter("1year")}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 min-w-[110px] ${
            activeFilter === "1year"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
        }`}
        >
        1 ano
        </button>
        <button
        onClick={() => setActiveFilter("alltime")}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 min-w-[110px] ${
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
        {topSongs.length > 0 ? (
        topSongs.map((item, index) => (
            <div
            key={index}
            onClick={() => handleSongClick(item.song)}
            className="group relative bg-gray-900 px-4 py-3 rounded-lg font-medium tracking-wide flex justify-between items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-purple-600/60 cursor-pointer border border-transparent hover:border-purple-500/30"
            >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-purple-100">
                {index + 1}. {item.song}
            </span>
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 group-hover:text-purple-300">
                {item.count} plays
                </span>
                {/* Modern Play icon on hover */}
                <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-400 transform group-hover:scale-110 fill-green-400" />
            </div>
              {/* Purple glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-purple-500/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-purple-500/10 group-hover:to-purple-600/20 transition-all duration-300 pointer-events-none"></div>
            </div>
        ))
        ) : (
        <p className="text-center text-gray-400">Loading your top songs...</p>
        )}
    </div>
    </div>
);
}