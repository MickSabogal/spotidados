import { 
  contarTotalMusicas, 
  obterPrimeiraMusica, 
  encontrarArtistaMaisOuvido,
  encontrarTop100Artistas,
  encontrarTop100Musicas,
  totalMusicasTocadas,
  totalMusicasDiferentes,
  totalMinutosOuvidos,
  mediaDiariaOuvida,
  horaMaisOuvida,
  estacaoMaisOuvida
} from '@/utils/dataProcessing'

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo ao Spotidados! 🎵</h1>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          Descubra insights incríveis sobre seus hábitos musicais
        </p>
      </div>

      {/* Cards de métricas principais */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Alguns dados:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{contarTotalMusicas()}</div>
            <div className="text-gray-700">Total de reproduções</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600 truncate">
              {obterPrimeiraMusica()}
            </div>
            <div className="text-gray-700">Primeira música no histórico</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-lg font-semibold text-purple-600 truncate">
              {encontrarArtistaMaisOuvido()}
            </div>
            <div className="text-gray-700">Artista mais ouvido</div>
          </div>
        </div>
      </div>

      {/* Grid com 3 colunas iguais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top 100 Artistas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎤 Top 100 Artistas</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {encontrarTop100Artistas().map((artista, index) => (
              <div key={index} className="text-gray-800">
                {index + 1}. {artista}
              </div>
            ))}
          </div>
        </div>

        {/* Top 100 Músicas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎵 Top 100 Músicas</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {encontrarTop100Musicas().map((musica, index) => (
              <div key={index} className="text-gray-800">
                {index + 1}. {musica}
              </div>
            ))}
          </div>
        </div>

        {/* Informações detalhadas */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ Informações Detalhadas</h2>

          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-green-600">{totalMusicasTocadas()}</div>
            <div className="text-gray-700">Músicas tocadas no total</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-blue-600">{totalMusicasDiferentes()}</div>
            <div className="text-gray-700">Músicas diferentes ouvidas</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-purple-600">{totalMinutosOuvidos()}</div>
            <div className="text-gray-700">Minutos totais ouvidos</div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-yellow-600">{mediaDiariaOuvida()}</div>
            <div className="text-gray-700">Média diária de escuta (min)</div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-pink-600">{horaMaisOuvida()}</div>
            <div className="text-gray-700">Hora do dia mais ouvida</div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-indigo-600">{estacaoMaisOuvida()}</div>
            <div className="text-gray-700">Estação do ano mais ouvida</div>
          </div>

        </div>
      </div>
    </div>
  )
}
