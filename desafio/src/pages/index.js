import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const topArtists = [
    { id: 1, name: 'Avery Davis', image: '/artist1.jpg' },
    { id: 2, name: 'Chidi Eze', image: '/artist2.jpg' },
    { id: 3, name: 'Yael Amari', image: '/artist3.jpg' },
    { id: 4, name: '+50', count: 50 }
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header con búsqueda */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Foto de perfil */}
          <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
            <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Barra de búsqueda */}
          <div className="flex-1 bg-gradient-to-r from-[#6BCA6F] to-[#000000] rounded-full px-4 py-2 flex items-center gap-2">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Song, album, artist, etc"
              className="bg-transparent outline-none flex-1 text-white placeholder-white"
            />
          </div>
        </div>
      </div>

      {/* Top Artist of this Month */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold whitespace-nowrap">Top Artist of this Month</h2>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {topArtists.map((artist) => (
            <Link
              key={artist.id}
              href={artist.count ? '/top-artists' : `/artist/${artist.id}`}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {artist.count ? (
                    <span className="text-3xl font-bold">{artist.count}</span>
                  ) : (
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-center">{artist.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Play */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold whitespace-nowrap">Recently Play</h2>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        {/* Card de Wrapped 2024 - SOLUCIÓN */}
        <Link href="/estadisticas" className="block">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500 via-orange-500 to-red-600 p-8 cursor-pointer transition-all duration-300 hover:brightness-110">
            {/* Elementos decorativos */}
            <div className="absolute top-6 left-6 w-24 h-24 bg-pink-600/60 rounded-2xl transform -rotate-12"></div>
            <div className="absolute bottom-6 right-6 w-40 h-40 border-8 border-red-400/40 rounded-3xl transform rotate-45"></div>

            {/* Contenido */}
            <div className="relative z-10 text-center py-12">
              <h3 className="text-4xl font-bold mb-3">Your 2024 Wrapped</h3>
              <p className="text-white/90 mb-8 text-lg">Jump into your year in audio.</p>
              <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold px-10 py-3 rounded-full transition-colors">
                Let's go
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Botón para ver todos los artistas */}
      <div className="px-4 mt-4">
        <Link href="/top-artists">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors">
            Ver Todos los Artistas Más Escuchados
          </button>
        </Link>
      </div>
    </div>
  )
}