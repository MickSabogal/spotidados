import Image from "next/image";
import Link from "next/link";
import {
    totalMusicasTocadas,
    totalMusicasDiferentes,
    totalMinutosOuvidos,
    mediaDiariaOuvida,
    estacaoMaisOuvida,
    horaMaisOuvida,
    encontrarArtistaMaisOuvido,
    obterPrimeiraMusica
} from "../utils/dataProcessing";

// Componente para cada estadística en cuadrado
function StatCard({ title, value, isHighlight }) {
    return (
        <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col justify-center text-left shadow-lg">
            <span className="text-xs text-gray-400 mb-2">{title}</span>
            <span className={`text-3xl font-bold ${isHighlight ? 'text-green-500' : 'text-white'}`}>
                {value}
            </span>
        </div>
    );
}

export default function EstatisticasPage() {
    return (
        <div className="min-h-screen bg-black text-white flex justify-center">
            <div className="w-full max-w-md pb-24 px-4">
                {/* Perfil y búsqueda */}
                <div className="flex items-center gap-3 my-4">
                    <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden relative">
                        <Image src="/cb.jpg" alt="Profile" fill className="object-cover" />
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-[#6BCA6F] to-[#000000] rounded-full px-4 py-2 flex items-center gap-2">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Song, album, artist, etc"
                            className="bg-transparent outline-none flex-1 text-white placeholder-white"
                        />
                    </div>
                </div>

                {/* Estadísticas en cuadrados */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <StatCard title="Played Music" value={totalMusicasTocadas()} />
                    <StatCard title="Different Music" value={totalMusicasDiferentes()} />
                    <StatCard title="Minutes Listened" value={totalMinutosOuvidos()} />
                    <StatCard title="Daily Average" value={`${mediaDiariaOuvida()} min`} />
                    <StatCard title="Favorite Season" value={estacaoMaisOuvida()} isHighlight />
                    <StatCard title="Preferred Time" value={horaMaisOuvida()} />
                    <StatCard title="Most Listened Artist" value={encontrarArtistaMaisOuvido()} />
                    <StatCard title="First Music Played" value={obterPrimeiraMusica()} />
                </div>

                {/* Botones Top 100 */}
                <div className="mt-12 flex flex-col gap-6">
                    <Link href="/top100">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors">
                            Top 100 Artists
                        </button>
                    </Link>
                    <Link href="/top100">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors">
                            Top 100 Songs
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}