import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Top100SongsComponent({ topSongs, isLoading, activeFilter, setActiveFilter, dateRange }) {
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('pt-PT', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Top 100 Songs</h1>

      {/* Date Range Info */}
      {dateRange.start && dateRange.end && (
        <p className="text-xs text-gray-400 mb-4">
          {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
        </p>
      )}

      {/* Time Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {[
          { label: "4 weeks", value: "month" },
          { label: "6 months", value: "6months" },
          { label: "1 year", value: "1year" },
          { label: "Always", value: "alltime" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-5 py-2 rounded-full text-sm transition-all duration-300 min-w-[110px] ${
              activeFilter === f.value
                ? "bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Songs List */}
      <div className="w-[90%] max-w-md space-y-3 mb-24">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : topSongs.length > 0 ? (
          topSongs.map((item, index) => (
            <Link
              key={index}
              href={`/artist?name=${encodeURIComponent(item.artist)}`}
              className="group relative bg-gray-900 px-4 py-3 rounded-lg font-medium tracking-wide flex justify-between items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-purple-600/60 cursor-pointer border border-transparent hover:border-purple-500/30"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-purple-100 text-sm">
                {index + 1}. {item.song}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 group-hover:text-purple-300">
                  {item.count} plays
                </span>
                <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-400 transform group-hover:scale-110 fill-green-400" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-purple-500/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-purple-500/10 group-hover:to-purple-600/20 transition-all duration-300 pointer-events-none"></div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-2">Nothing to show</p>
            <p className="text-xs text-gray-500">There is no data for this period. Please try another one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
