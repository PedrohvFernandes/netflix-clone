const API_KEY = '4d52a47ee50ee715bcc73cff19755d54'
const API_URL = 'https://api.themoviedb.org/3'

// export const categories
const categories = [
  {
    name: 'trending',
    title: 'Em alta',
    path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
    isLarge: true
  },
  {
    name: 'netflixOriginals',
    title: 'Originais Netflix',
    path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    isLarge: false
  },
  {
    name: 'topRated',
    title: 'Populares',
    path: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
    isLarge: false
  },
  {
    name: 'comedy',
    title: 'Comédias',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    isLarge: false
  },
  {
    name: 'romances',
    title: 'Romances',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    isLarge: false
  },
  {
    name: 'documentaries',
    title: 'Documentários',
    path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    isLarge: false
  }
]

// Pra pegar as info de cada categoria
export const getMovies = async path => {
  try {
    let url = `${API_URL}${path}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.log('error getMovies: ' + error)
  }
}

// Poderia ter exportado direto no array de objetos, mas como boa pratica  a gente faz tipo um alias -> Alias quer dizer “pseudônimo”, “apelido” e, em computação, é um comando que permite substituir uma palavra por outras ou por uma cadeia de caracteres.
export default categories
