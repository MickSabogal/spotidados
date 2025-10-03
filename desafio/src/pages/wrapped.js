import Link from "next/link";
import SearchBar from "../components/SearchBar";
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
            <div className="w-full max-w-md pb-24">
                {/* SearchBar Component */}
                <SearchBar />

                {/* Estadísticas en cuadrados */}
                <div className="grid grid-cols-2 gap-4 mt-6 px-4">
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
                <div className="mt-12 flex flex-col gap-6 px-4">
                    <Link href="/top100ArtistsPage">
                        <button className="w-full rounded-2xl bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-4 cursor-pointer transition-all duration-300 hover:brightness-110 text-black">
                            Top 100 Artists
                        </button>
                    </Link>
                    <Link href="/top100SongsPage">
                        <button className="w-full rounded-2xl bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-4 cursor-pointer transition-all duration-300 hover:brightness-110 text-black">
                            Top 100 Songs
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}