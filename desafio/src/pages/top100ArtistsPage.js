import { useState, useEffect } from 'react';
import dadosHistory from "../data/history.json";
import Top100ArtistsComponent from '../components/Top100ArtistsComponent';

export default function Top100ArtistsPage() {
  const [activeFilter, setActiveFilter] = useState("alltime");
  const [topArtists, setTopArtists] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processHistory = () => {
      setIsLoading(true);
      try {
        let mostRecentDate = 0;
        dadosHistory.forEach(entry => {
          const entryTime = new Date(entry.ts).getTime();
          if (entryTime > mostRecentDate) mostRecentDate = entryTime;
        });

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
        }

        const artistCounts = {};
        let minDate = Infinity;
        let maxDate = -Infinity;

        dadosHistory.forEach(entry => {
          const entryTime = new Date(entry.ts).getTime();
          if (isNaN(entryTime) || entryTime < startTimestamp) return;

          if (entryTime < minDate) minDate = entryTime;
          if (entryTime > maxDate) maxDate = entryTime;

          const artist = entry.master_metadata_album_artist_name;
          if (artist) {
            if (!artistCounts[artist]) artistCounts[artist] = { artist, count: 0, ms: 0 };
            artistCounts[artist].count += 1;
            artistCounts[artist].ms += entry.ms_played || 0;
          }
        });

        const artistsArray = Object.values(artistCounts).sort((a, b) => b.count - a.count);
        setTopArtists(artistsArray.slice(0, 100));

        setDateRange({
          start: minDate !== Infinity ? new Date(minDate) : null,
          end: maxDate !== -Infinity ? new Date(maxDate) : null
        });
      } catch (error) {
        console.error(error);
        setTopArtists([]);
        setDateRange({ start: null, end: null });
      } finally {
        setIsLoading(false);
      }
    };

    processHistory();
  }, [activeFilter]);

  const formatDate = (date) => date ? date.toLocaleDateString('pt-PT', { year: 'numeric', month: 'short', day: 'numeric' }) : "";
  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <Top100ArtistsComponent
      topArtists={topArtists}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      isLoading={isLoading}
      dateRange={dateRange}
      formatDate={formatDate}
      formatTime={formatTime}
    />
  );
}