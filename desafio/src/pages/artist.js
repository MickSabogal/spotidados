import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Home, Edit, Users } from "lucide-react";
import dadosHistory from "../data/history.json";
import {
  totalMusicasTocadas,
  totalMusicasDiferentes,
  totalMinutosOuvidos,
  estacaoMaisOuvida,
} from "../utils/dataProcessing.js";

function obterDadosArtista(nomeArtista) {
  if (!dadosHistory) return null;

  // Filtrar apenas as músicas do artista
  const musicasArtista = dadosHistory.filter(
    (m) => m.master_metadata_album_artist_name === nomeArtista
  );

  if (musicasArtista.length === 0) return null;

  // Contar plays do artista
  const artistPlays = musicasArtista.length;

  // Contar músicas diferentes do artista
  const musicasUnicas = new Set(
    musicasArtista.map((m) => m.master_metadata_track_name).filter(Boolean)
  );

  // Total de minutos ouvindo o artista
  const msArtista = musicasArtista.reduce(
    (acc, m) => acc + (m.ms_played || 0),
    0
  );
  const minutosArtista = Math.floor(msArtista / 60000);

  // Estação favorita para este artista
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

  // Top 20 músicas do artista por tempo total
  const contagemMusicas = {};
  musicasArtista.forEach((m) => {
    const track = m.master_metadata_track_name;
    if (track) {
      if (!contagemMusicas[track]) {
        contagemMusicas[track] = 0;
      }
      contagemMusicas[track] += m.ms_played || 0;
    }
  });

  const top20 = Object.entries(contagemMusicas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([title, ms]) => ({ title, ms }));

  // Calcular posição no top 100
  const contagemArtistas = {};
  dadosHistory.forEach((musica) => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
    }
  });

  const listaOrdenada = Object.entries(contagemArtistas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100);

  const posicao =
    listaOrdenada.findIndex(([artista]) => artista === nomeArtista) + 1;

  return {
    artistPlays,
    uniqueTracks: musicasUnicas.size,
    passastes: minutosArtista,
    favoriteSeason: estacaoFavorita,
    top20,
    position100: posicao > 0 ? posicao : null,
  };
}

export default function ArtistStats() {
  const router = useRouter();

  // pega "name" da query ?name=Artist%20Name
  const queryName = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name;

  const [artistName, setArtistName] = useState(() =>
    typeof queryName === "string" ? decodeURIComponent(queryName) : "Anitta"
  );
  const [stats, setStats] = useState(null);
  const [totalPlays, setTotalPlays] = useState(0);

  // atualiza artistName quando a rota mudar (router.query disponível só depois do primeiro render)
  useEffect(() => {
    if (!router.isReady) return;
    const nameParam = Array.isArray(router.query.name)
      ? router.query.name[0]
      : router.query.name;
    setArtistName(nameParam ? decodeURIComponent(nameParam) : "Anitta");
  }, [router.isReady, router.query.name]);

  // carrega stats do artista sempre que artistName muda
  useEffect(() => {
    if (!artistName) return;
    const data = obterDadosArtista(artistName); // função já presente no arquivo
    setStats(data);

    // calcula plays totais do history.json
    if (typeof dadosHistory !== "undefined" && Array.isArray(dadosHistory)) {
      setTotalPlays(dadosHistory.length);
    }
  }, [artistName]);

  const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";

  const percentArtist = useMemo(() => {
    if (!stats || !totalPlays) return "0.0";
    return ((stats.artistPlays / totalPlays) * 100).toFixed(1);
  }, [stats, totalPlays]);

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex justify-center pb-24">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-gradient-to-b from-[#111111] to-[#050505] rounded-b-3xl overflow-hidden shadow-2xl">
          {/* Imagem topo */}
          <div className="relative w-full h-72 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center">
              {" "}
              <h1 className="text-white text-6xl font-bold tracking-tight"></h1>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-white text-4xl font-bold tracking-tight">
                {artistName.toUpperCase()}
              </h1>
            </div>
          </div>

          {/* Estatísticas - grid de cards */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Artist plays */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">
                  Ouviste este artista
                </p>
                <p className="text-white text-3xl font-bold">
                  {fmt(stats.artistPlays)} vezes
                </p>
              </div>

              {/* Percentual do total */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">
                  % das plays (do total)
                </p>
                <p className="text-[#1DB954] font-bold text-2xl">
                  {percentArtist}%
                </p>
                <p className="text-gray-500 text-xs mt-1">do total de plays</p>
              </div>

              {/* Total plays da conta */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Plays no total</p>
                <p className="text-white text-2xl font-bold">
                  {fmt(totalPlays)}
                </p>
              </div>

              {/* Músicas diferentes */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">
                  Músicas diferentes ouvidas
                </p>
                <p className="text-white text-2xl font-bold">
                  {fmt(stats.uniqueTracks)}
                </p>
              </div>

              {/* Minutos totais (passastes) */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">
                  Minutos totais a ouvir
                </p>
                <p className="text-white text-2xl font-bold">
                  {fmt(stats.passastes)} min
                </p>
              </div>

              {/* Posição no top100 */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Posição no top 100</p>
                <p className="text-[#1DB954] font-bold text-2xl">
                  {stats.position100 ? `#${stats.position100}` : "N/A"}
                </p>
                <p className="text-gray-500 text-xs mt-1">desde sempre</p>
              </div>

              {/* Estação preferida para ouvir */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Quando ouves mais</p>
                <p className="text-[#1DB954] font-bold text-2xl">
                  {stats.favoriteSeason}
                </p>
                <p className="text-gray-500 text-xs mt-1">estação do ano</p>
              </div>

              {/* Média por música */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Média por música</p>
                <p className="text-white text-lg">
                  {stats.uniqueTracks > 0
                    ? Math.round(stats.artistPlays / stats.uniqueTracks)
                    : 0}
                  x
                </p>
                <p className="text-gray-500 text-xs mt-1">cada música</p>
              </div>

              {/* Top 20 (ocupando duas colunas) */}
              <div className="col-span-2 rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-300 font-semibold">
                    Top 20 músicas (por tempo de reprodução)
                  </p>
                  <p className="text-gray-500 text-sm">
                    {stats.top20.length} itens
                  </p>
                </div>
                <div className="max-h-56 overflow-auto pr-2">
                  <ol className="space-y-2">
                    {stats.top20.map((t, i) => (
                      <li
                        key={t.title}
                        className="flex justify-between items-center bg-gray-900/30 rounded-md p-2"
                      >
                        <div>
                          <p className="text-white font-medium text-sm">
                            {i + 1}. {t.title}
                          </p>
                        </div>
                        <p className="text-gray-400 text-xs">
                          {Math.floor(t.ms / 60000)}m{" "}
                          {Math.floor((t.ms % 60000) / 1000)}s
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Textos complementares */}
            <div className="text-center pt-2">
              <p className="text-gray-500 text-sm">
                Passastes{" "}
                <span className="font-bold text-[#1DB954]">
                  {fmt(stats.passastes)}
                </span>{" "}
                minutos a ouvir este artista
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegação inferior */}
      <div className="p-4 flex justify-around items-center border-t border-gray-800 bg-[#0f0f0f]/90 backdrop-blur-sm fixed bottom-0 w-full max-w-md">
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
          <Home className="w-6 h-6" />
          <span className="text-xs">Início</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
          <Edit className="w-6 h-6" />
          <span className="text-xs">Buscar</span>
        </button>

        <button className="flex flex-col items-center gap-1 bg-gradient-to-r from-[#1DB954] to-[#12a94a] text-white rounded-full p-3 hover:opacity-95 transition">
          <Users className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
