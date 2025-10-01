// pages/top100.js
import { Home, Edit, Users, Play } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dadosHistory from "../data/history.json";

export default function Top100Songs() {
  const [activeFilter, setActiveFilter] = useState("alltime");
  const [topSongs, setTopSongs] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isLoading, setIsLoading] = useState(true);

  // Process history data based on active filter
  useEffect(() => {
    const processHistory = () => {
      setIsLoading(true);
      
      try {
        // Primeiro, vamos encontrar a data mais recente no histórico
        let mostRecentDate = 0;
        for (let i = 0; i < dadosHistory.length; i++) {
          const entryTime = new Date(dadosHistory[i].ts).getTime();
          if (entryTime > mostRecentDate) {
            mostRecentDate = entryTime;
          }
        }
        
        // 1. Calcular timestamp de corte baseado no filtro
        // Agora usa a data mais recente do histórico, não a data atual
        const referenceDate = mostRecentDate || Date.now();
        let startTimestamp;
        
        switch (activeFilter) {
          case "month":
            startTimestamp = referenceDate - (30 * 24 * 60 * 60 * 1000);
            break;
          case "6months":
            startTimestamp = referenceDate - (6 * 30 * 24 * 60 * 60 * 1000);
            break;
          case "1year":
            startTimestamp = referenceDate - (365 * 24 * 60 * 60 * 1000);
            break;
          case "alltime":
          default:
            startTimestamp = 0;
            break;
        }
        
        console.log("Filtro:", activeFilter);
        console.log("Data mais recente no histórico:", new Date(mostRecentDate).toLocaleDateString());
        console.log("Filtrando a partir de:", new Date(startTimestamp).toLocaleDateString());

        // 2. Filtrar e contar em um único loop
        const songCounts = {};
        let minDate = Infinity;
        let maxDate = -Infinity;
        
        for (let i = 0; i < dadosHistory.length; i++) {
          const entry = dadosHistory[i];
          const entryTime = new Date(entry.ts).getTime();
          
          // Pular se for inválido ou fora do período
          if (isNaN(entryTime) || entryTime < startTimestamp) continue;
          
          // Atualizar range de datas
          if (entryTime < minDate) minDate = entryTime;
          if (entryTime > maxDate) maxDate = entryTime;
          
          // Contar música
          const track = entry.master_metadata_track_name;
          const artist = entry.master_metadata_album_artist_name;
          
          if (track && artist) {
            const key = `${artist} - ${track}`;
            if (!songCounts[key]) {
              songCounts[key] = { song: key, count: 0, ms: 0 };
            }
            songCounts[key].count += 1;
            songCounts[key].ms += entry.ms_played || 0;
          }
        }

        // 3. Converter para array e ordenar
        const songsArray = Object.values(songCounts);
        songsArray.sort((a, b) => b.count - a.count);
        const top100 = songsArray.slice(0, 100);

        setTopSongs(top100);
        
        // 4. Definir range de datas
        if (minDate !== Infinity && maxDate !== -Infinity) {
          setDateRange({ 
            start: new Date(minDate), 
            end: new Date(maxDate) 
          });
        } else {
          setDateRange({ start: null, end: null });
        }
        
      } catch (error) {
        console.error("Erro ao processar histórico:", error);
        setTopSongs([]);
        setDateRange({ start: null, end: null });
      } finally {
        setIsLoading(false);
      }
    };

    processHistory();
  }, [activeFilter]);

  const handleSongClick = (song) => {
    console.log("Playing:", song);
    alert(`Now playing: ${song}`);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('pt-PT', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Carregando...</p>
          </div>
        ) : topSongs.length > 0 ? (
          topSongs.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSongClick(item.song)}
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
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-2">Nenhuma música encontrada neste período</p>
            <p className="text-xs text-gray-500">Tente selecionar um período diferente</p>
          </div>
        )}
      </div>
    </div>
  );
}