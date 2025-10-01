import dadosHistory from "../data/history.json";

export function contarTotalMusicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }
  return dadosHistory.length;
}

export function obterPrimeiraMusica() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhuma música encontrada";
  }
  return dadosHistory[0]?.master_metadata_track_name || "Música desconhecida";
}

export function encontrarArtistaMaisOuvido() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  const contagemArtistas = {};

  dadosHistory.forEach((musica) => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
    }
  });

  let artistaMaisOuvido = "Nenhum artista encontrado";
  let maiorContagem = 0;

  for (const artista in contagemArtistas) {
    if (contagemArtistas[artista] > maiorContagem) {
      maiorContagem = contagemArtistas[artista];
      artistaMaisOuvido = artista;
    }
  }

  return artistaMaisOuvido;
}

export function encontrarTop100Artistas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return ["Nenhum artista encontrado"];
  }

  const contagemArtistas = {};

  dadosHistory.forEach((musica) => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
    }
  });

  const listaOrdenada = Object.entries(contagemArtistas)
    .sort((a, b) => b[1] - a[1]) // mais ouvidos primeiro
    .slice(0, 100); // só os 100

  return listaOrdenada.map(([artista]) => artista);
}

export function encontrarTop100Musicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return ["Nenhuma música encontrada"];
  }

  const contagemMusicas = {};

  dadosHistory.forEach((musica) => {
    const track = musica.master_metadata_track_name;
    if (track) {
      contagemMusicas[track] = (contagemMusicas[track] || 0) + 1;
    }
  });

  const listaOrdenada = Object.entries(contagemMusicas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100);

  return listaOrdenada.map(([track]) => track);
}

// Total de músicas tocadas (contando repetições)
export function totalMusicasTocadas() {
  if (!dadosHistory) return 0;
  return dadosHistory.length;
}

// Total de músicas diferentes
export function totalMusicasDiferentes() {
  if (!dadosHistory) return 0;
  const musicasUnicas = new Set(
    dadosHistory.map((m) => m.master_metadata_track_name).filter(Boolean)
  );
  return musicasUnicas.size;
}

// Total de minutos ouvidos
export function totalMinutosOuvidos() {
  if (!dadosHistory) return 0;
  const msTotais = dadosHistory.reduce((acc, m) => acc + (m.ms_played || 0), 0);
  return Math.floor(msTotais / 60000); // converte ms para minutos
}

// Média de tempo diário de escuta
export function mediaDiariaOuvida() {
  if (!dadosHistory) return 0;

  const dias = new Set(
    dadosHistory.map((m) => new Date(m.ts).toISOString().slice(0, 10))
  );

  const totalMinutos = totalMinutosOuvidos();
  return (totalMinutos / dias.size).toFixed(1); // minutos/dia
}

// Hora do dia em que mais ouve música
export function horaMaisOuvida() {
  if (!dadosHistory) return "N/A";

  const contagemHoras = {};

  dadosHistory.forEach((m) => {
    const hora = new Date(m.ts).getHours();
    contagemHoras[hora] = (contagemHoras[hora] || 0) + 1;
  });

  const horaMax = Object.entries(contagemHoras).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    [0, 0]
  )[0];
  return `${horaMax}:00`;
}

// Estação do ano em que mais ouve música
export function estacaoMaisOuvida() {
  if (!dadosHistory) return "N/A";

  const contagemEstacoes = { Winter: 0, Spring: 0, Summer: 0, Autumn: 0 };

  dadosHistory.forEach((m) => {
    const mes = new Date(m.ts).getMonth(); // 0 = Janeiro, 11 = Dezembro
    if ([11, 0, 1].includes(mes)) contagemEstacoes.Winter += 1;
    else if ([2, 3, 4].includes(mes)) contagemEstacoes.Spring += 1;
    else if ([5, 6, 7].includes(mes)) contagemEstacoes.Summer += 1;
    else contagemEstacoes.Autumn += 1;
  });

  // Retorna a estação com maior contagem
  return Object.entries(contagemEstacoes).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
}
