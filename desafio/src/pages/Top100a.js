// pages/top100a.js
import { Home, Edit, Users, Play, Music } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dadosHistory from "../data/history.json";

export default function Top100Artists() {
  const [activeFilter, setActiveFilter] = useState("alltime");
  const [topArtists, setTopArtists] = useState([]);
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

        // 2. Filtrar e contar artistas em um único loop
        const artistCounts = {};
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
          
          // Contar artista
          const artist = entry.master_metadata_album_artist_name;
          
          if (artist) {
            if (!artistCounts[artist]) {
              artistCounts[artist] = { artist: artist, count: 0, ms: 0 };
            }
            artistCounts[artist].count += 1;
            artistCounts[artist].ms += entry.ms_played || 0;
          }
        }

        // 3. Converter para array e ordenar
        const artistsArray = Object.values(artistCounts);
        artistsArray.sort((a, b) => b.count - a.count);
        const top100 = artistsArray.slice(0, 100);

        setTopArtists(top100);
        
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
        setTopArtists([]);
        setDateRange({ start: null, end: null });
      } finally {
        setIsLoading(false);
      }
    };

    processHistory();
  }, [activeFilter]);

  const handleArtistClick = (artist) => {
    console.log("Playing artist:", artist);
    alert(`Artista: ${artist}`);
  };

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
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Top 100 Artistas</h1>
      
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

      {/* Artists List */}
      <div className="w-[90%] max-w-md space-y-3 mb-24">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Carregando...</p>
          </div>
        ) : topArtists.length > 0 ? (
          topArtists.map((item, index) => (
            <div
              key={index}
              onClick={() => handleArtistClick(item.artist)}
              className="group relative bg-gray-900 px-4 py-3 rounded-lg font-medium tracking-wide flex justify-between items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-blue-600/60 cursor-pointer border border-transparent hover:border-blue-500/30"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-100 text-sm">
                {index + 1}. {item.artist}
              </span>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-400 group-hover:text-blue-300">
                    {item.count} plays
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-blue-400">
                    {formatTime(item.ms)}
                  </div>
                </div>
                <Music className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-green-400 transform group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-500/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-blue-500/10 group-hover:to-blue-600/20 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-2">Nenhum artista encontrado neste período</p>
            <p className="text-xs text-gray-500">Tente selecionar um período diferente</p>
          </div>
        )}
      </div>
    </div>
  );
}