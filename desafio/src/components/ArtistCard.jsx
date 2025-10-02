// components/ArtistCard.jsx
import { useState, useEffect, useMemo } from "react";
import dadosHistory from "../data/history.json";

function obterDadosArtista(nomeArtista) {
  if (!dadosHistory) return null;

  const musicasArtista = dadosHistory.filter(
    (m) => m.master_metadata_album_artist_name === nomeArtista
  );

  if (musicasArtista.length === 0) return null;

  const artistPlays = musicasArtista.length;
  const musicasUnicas = new Set(
    musicasArtista.map((m) => m.master_metadata_track_name).filter(Boolean)
  );
  const msArtista = musicasArtista.reduce((acc, m) => acc + (m.ms_played || 0), 0);
  const minutosArtista = Math.floor(msArtista / 60000);

  const contagemEstacoes = { Inverno: 0, Primavera: 0, Verão: 0, Outono: 0 };
  musicasArtista.forEach((m) => {
    const mes = new Date(m.ts).getMonth();
    if ([11, 0, 1].includes(mes)) contagemEstacoes.Inverno += 1;
    else if ([2, 3, 4].includes(mes)) contagemEstacoes.Primavera += 1;
    else if ([5, 6, 7].includes(mes)) contagemEstacoes.Verão += 1;
    else contagemEstacoes.Outono += 1;
  });
  const estacaoFavorita = Object.entries(contagemEstacoes).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  const contagemMusicas = {};
  musicasArtista.forEach((m) => {
    const track = m.master_metadata_track_name;
    if (track) contagemMusicas[track] = (contagemMusicas[track] || 0) + (m.ms_played || 0);
  });

  const top20 = Object.entries(contagemMusicas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([title, ms]) => ({ title, ms }));

  const contagemArtistas = {};
  dadosHistory.forEach((musica) => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
  });

  const listaOrdenada = Object.entries(contagemArtistas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100);

  const posicao = listaOrdenada.findIndex(([artista]) => artista === nomeArtista) + 1;

  return {
    artistPlays,
    uniqueTracks: musicasUnicas.size,
    passastes: minutosArtista,
    favoriteSeason: estacaoFavorita,
    top20,
    position100: posicao > 0 ? posicao : null,
    todasMusicas: musicasArtista,
  };
}

export default function ArtistCard({ artistName, totalPlays }) {
  const [stats, setStats] = useState(null);
  const [filterRange, setFilterRange] = useState("all"); // filtro do top 20

  useEffect(() => {
    if (!artistName) return;
    const data = obterDadosArtista(artistName);
    setStats(data);
  }, [artistName]);

  const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";

  const percentArtist = useMemo(() => {
    if (!stats || !totalPlays) return "0.0";
    return ((stats.artistPlays / totalPlays) * 100).toFixed(1);
  }, [stats, totalPlays]);

  const filteredTop20 = useMemo(() => {
    if (!stats?.todasMusicas || stats.todasMusicas.length === 0) return [];

    // pegar a data mais recente do histórico
    const mostRecentDate = Math.max(...stats.todasMusicas.map((m) => new Date(m.ts).getTime()));

    let startTime = 0;

    switch (filterRange) {
      case "4w":
        startTime = mostRecentDate - 4 * 7 * 24 * 60 * 60 * 1000;
        break;
      case "6m":
        startTime = mostRecentDate - Math.round(6 * 30.44 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
        startTime = mostRecentDate - 365 * 24 * 60 * 60 * 1000;
        break;
      case "all":
      default:
        startTime = 0;
    }

    const contagem = {};
    stats.todasMusicas.forEach((m) => {
      const ts = new Date(m.ts).getTime();
      if (ts < startTime) return;
      const track = m.master_metadata_track_name;
      if (!track) return;
      contagem[track] = (contagem[track] || 0) + (m.ms_played || 0);
    });

    return Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([title, ms]) => ({ title, ms }));
  }, [filterRange, stats]);

  if (!stats) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Grid de estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Ouviste este artista</p>
          <p className="text-white text-3xl font-bold">{fmt(stats.artistPlays)} vezes</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">% das plays (do total)</p>
          <p className="text-[#1DB954] font-bold text-2xl">{percentArtist}%</p>
          <p className="text-gray-500 text-xs mt-1">do total de plays</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Plays no total</p>
          <p className="text-white text-2xl font-bold">{fmt(totalPlays)}</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Músicas diferentes ouvidas</p>
          <p className="text-white text-2xl font-bold">{fmt(stats.uniqueTracks)}</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Minutos totais a ouvir</p>
          <p className="text-white text-2xl font-bold">{fmt(stats.passastes)} min</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Posição no top 100</p>
          <p className="text-[#1DB954] font-bold text-2xl">{stats.position100 ? `#${stats.position100}` : "N/A"}</p>
          <p className="text-gray-500 text-xs mt-1">desde sempre</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Quando ouves mais</p>
          <p className="text-[#1DB954] font-bold text-2xl">{stats.favoriteSeason}</p>
          <p className="text-gray-500 text-xs mt-1">estação do ano</p>
        </div>

        <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
          <p className="text-gray-400 text-sm mb-2">Média por música</p>
          <p className="text-white text-lg">{stats.uniqueTracks > 0 ? Math.round(stats.artistPlays / stats.uniqueTracks) : 0}x</p>
          <p className="text-gray-500 text-xs mt-1">cada música</p>
        </div>
      </div>

      {/* Top 20 com filtros */}
      <div className="col-span-2 rounded-xl bg-[#121212]/80 p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-300 font-semibold">Top 20</p>
          <div className="space-x-2">
            {[
              { label: "4 weeks", value: "4w" },
              { label: "6 months", value: "6m" },
              { label: "1 year", value: "1y" },
              { label: "Always", value: "all" },
            ].map((f) => (
              <button
                key={f.value}
                className={`px-2 py-1 rounded ${
                  filterRange === f.value ? "bg-[#1DB954] text-black" : "bg-gray-700 text-gray-200"
                }`}
                onClick={() => setFilterRange(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-56 overflow-auto pr-2">
          {filteredTop20.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Nenhuma música neste período</p>
          ) : (
            <ol className="space-y-2">
              {filteredTop20.map((t, i) => (
                <li key={t.title} className="flex justify-between items-center bg-gray-900/30 rounded-md p-2">
                  <p className="text-white font-medium text-sm">{i + 1}. {t.title}</p>
                  <p className="text-gray-400 text-xs">{Math.floor(t.ms / 60000)}m {Math.floor((t.ms % 60000) / 1000)}s</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}