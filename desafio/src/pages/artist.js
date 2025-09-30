import { useState, useMemo } from 'react';
import { Home, Edit, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtistStats() {
  // dados de exemplo — substitua pelos reais
  const [artistPlays] = useState(9905);
  const [totalPlays] = useState(580000); // plays totais da conta
  const [uniqueTracks] = useState(874); // músicas diferentes ouvidas
  const [passastes] = useState(23912); // minutos totais já existentes
  const [position100] = useState(1); // posição do artista no top100 "desde sempre"
  const [favoriteSeason] = useState('Verão'); // estação preferida para ouvir
  const [top20] = useState([
    { title: 'Track A', ms: 240000 },
    { title: 'Track B', ms: 210000 },
    { title: 'Track C', ms: 200000 },
    { title: 'Track D', ms: 180000 },
    { title: 'Track E', ms: 170000 },
    { title: 'Track F', ms: 160000 },
    { title: 'Track G', ms: 150000 },
    { title: 'Track H', ms: 140000 },
    { title: 'Track I', ms: 130000 },
    { title: 'Track J', ms: 120000 },
    { title: 'Track K', ms: 110000 },
    { title: 'Track L', ms: 100000 },
    { title: 'Track M', ms: 90000 },
    { title: 'Track N', ms: 80000 },
    { title: 'Track O', ms: 70000 },
    { title: 'Track P', ms: 60000 },
    { title: 'Track Q', ms: 50000 },
    { title: 'Track R', ms: 40000 },
    { title: 'Track S', ms: 30000 },
    { title: 'Track T', ms: 20000 },
  ]);

  // helpers
  const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const percentArtist = useMemo(() => {
    if (!totalPlays) return '0.0';
    return (artistPlays / totalPlays * 100).toFixed(1);
  }, [artistPlays, totalPlays]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex justify-center">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-gradient-to-b from-[#111111] to-[#050505] rounded-b-3xl overflow-hidden shadow-2xl">

          {/* Imagem topo */}
          <div className="relative w-full h-72 md:h-96 overflow-hidden">
            <Image src="/cb.jpg" alt="Chris Brown" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-white text-4xl font-bold tracking-tight">CHRIS BROWN</h1>
            </div>
          </div>

          {/* Estatísticas - grid de cards */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Artist plays */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Ouviste este artista</p>
                <p className="text-white text-3xl font-bold">{fmt(artistPlays)} vezes</p>
              </div>

              {/* Percentual do total */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">% das plays (do total)</p>
                <p className="text-[#1DB954] font-bold text-2xl">{percentArtist}%</p>
                <p className="text-gray-500 text-xs mt-1">do total de plays</p>
              </div>

              {/* Total plays da conta */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Plays no total</p>
                <p className="text-white text-2xl font-bold">{fmt(totalPlays)}</p>
              </div>

              {/* Músicas diferentes */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Músicas diferentes ouvidas</p>
                <p className="text-white text-2xl font-bold">{fmt(uniqueTracks)}</p>
              </div>

              {/* Minutos totais (passastes) */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Minutos totais a ouvir</p>
                <p className="text-white text-2xl font-bold">{fmt(passastes)} min</p>
              </div>

              {/* Posição no top100 */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Posição no top 100</p>
                <p className="text-[#1DB954] font-bold text-2xl">#{position100}</p>
                <p className="text-gray-500 text-xs mt-1">desde sempre</p>
              </div>

              {/* Estação preferida para ouvir */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Quando ouves mais</p>
                <p className="text-[#1DB954] font-bold text-2xl">{favoriteSeason}</p>
                <p className="text-gray-500 text-xs mt-1">estação do ano</p>
              </div>

              {/* Espaço para outro card futuro */}
              <div className="rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <p className="text-gray-400 text-sm mb-2">Outros insights</p>
                <p className="text-white text-lg">—</p>
              </div>

              {/* Top 20 (ocupando duas colunas) */}
              <div className="col-span-2 rounded-xl bg-[#121212]/80 p-4 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-300 font-semibold">Top 20 músicas (por tempo de reprodução)</p>
                  <p className="text-gray-500 text-sm">{top20.length} itens</p>
                </div>
                <div className="max-h-56 overflow-auto pr-2">
                  <ol className="space-y-2">
                    {top20.map((t, i) => (
                      <li key={t.title} className="flex justify-between items-center bg-gray-900/30 rounded-md p-2">
                        <div>
                          <p className="text-white font-medium">{i + 1}. {t.title}</p>
                          <p className="text-gray-400 text-xs">{Math.floor(t.ms / 60000)}m {Math.floor((t.ms % 60000) / 1000)}s total</p>
                        </div>
                        <span className="text-sm text-gray-300">{fmt(t.ms)} ms</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Textos complementares */}
            <div className="text-center pt-2">
              <p className="text-gray-500 text-sm">Passastes <span className="font-bold text-[#1DB954]">{fmt(passastes)}</span></p>
              <p className="text-gray-500 text-sm">minutos a ouvir este artista</p>
            </div>
          </div>

          {/* Barra de navegação inferior */}
          <div className="p-4 flex justify-around items-center border-t border-gray-800 bg-[#0f0f0f]/70 backdrop-blur-sm">
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
      </div>
    </div>
  );
}