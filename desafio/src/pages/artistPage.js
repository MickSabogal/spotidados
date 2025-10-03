import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArtistCard from "@/components/ArtistCard";
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

  const contagemEstacoes = { Winter: 0, Spring: 0, Summer: 0, Autumn: 0 };
  musicasArtista.forEach((m) => {
    const mes = new Date(m.ts).getMonth();
    if ([11, 0, 1].includes(mes)) contagemEstacoes.Winter += 1;
    else if ([2, 3, 4].includes(mes)) contagemEstacoes.Spring += 1;
    else if ([5, 6, 7].includes(mes)) contagemEstacoes.Summer += 1;
    else contagemEstacoes.Autumn += 1;
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

  const maxTs = Math.max(...musicasArtista.map((m) => new Date(m.ts).getTime()));

  return {
    artistPlays,
    uniqueTracks: musicasUnicas.size,
    passastes: minutosArtista,
    favoriteSeason: estacaoFavorita,
    top20,
    position100: posicao > 0 ? posicao : null,
    todasMusicas: musicasArtista,
    maxTs,
  };
}

export default function ArtistPage() {
  const router = useRouter();
  const queryName = Array.isArray(router.query.name) ? router.query.name[0] : router.query.name;
  const [artistName, setArtistName] = useState(() =>
    queryName ? decodeURIComponent(queryName) : "Eminem"
  );
  const [stats, setStats] = useState(null);
  const [totalPlays, setTotalPlays] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    const nameParam = Array.isArray(router.query.name) ? router.query.name[0] : router.query.name;
    setArtistName(nameParam ? decodeURIComponent(nameParam) : "Eminem");
  }, [router.isReady, router.query.name]);

  useEffect(() => {
    if (!artistName) return;
    const data = obterDadosArtista(artistName);
    setStats(data);
    setTotalPlays(dadosHistory.length);
  }, [artistName]);

  if (!stats) return <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-gray-400">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex justify-center pb-24">
      <ArtistCard artistName={artistName} stats={stats} totalPlays={totalPlays} />
    </div>
  );
}