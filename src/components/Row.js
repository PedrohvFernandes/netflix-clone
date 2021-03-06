// rfc -> snippet -> cria um componente react
import React, { useEffect } from 'react'
import movieTrailer from 'movie-trailer'
// import ReactPlayer from 'react-player'
import YouTube from 'react-youtube'
import { getMovies } from '../api'

import './Row.css'

const imageHost = 'https://image.tmdb.org/t/p/original/'

// Propriedades que ele esta recebendo
// const Row = ({ title, path }) =>
function Row({ title, path, isLarge }) {
  const [movies, setMovies] = React.useState([])
  const [trailerUrl, setTrailerUrl] = React.useState('')

  // Movie trailer é uma lib que busca trailers do Youtube para qualquer filme Retornar um ou vários URLs de trailer com o titulo do video e React-player é o componente que renderiza o video, um componente com a url do video direta. Poderia usar o react-youtube no lugar do React-player, mas ele estava tendo problemas no local-host
  const handleOnclick = movie => {
    //pegar a url do trailer no youtube
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
        .then(url => {
          if (url === null) {
            console.log('Não foi possível encontrar o trailer')
            setTrailerUrl('J1USmpnJ1A8')
          } else {
            // https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams
            // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
            let urlParams = new URLSearchParams(new URL(url).search)
            //https://www.youtube.com/watch?v=pEWZQF-iTU8
            setTrailerUrl(urlParams.get('v')) //pEWZQF-iTU8

            // setTrailerUrl(url)
          }
        })
        .catch(err => {
          console.log('HandleOnClick fetching movie trailer', err)
        })
    }
  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  // _path -> só para reforcar que eh uma variavel local, pro scopo pequeno aqui
  const fetchMovies = async _path => {
    try {
      // usando o getMovies do api.js, assim sendo esta dividido por dominio e responsabilidade, sem precisar ficar fazendo a req toda hora.
      const data = await getMovies(_path)
      console.log('data: ', data)
      // Meus filmes são os que estão no data.results, ou seja a resposta do req(request)
      // ? -> pra não ter problema quando o valor for null -> nullPointer -> ponteiro nulo (null)
      setMovies(data?.results)
    } catch (error) {
      console.log('error fetchMovies: ', error)
    }
  }
  // useeffectSnippet-> snippet
  useEffect(() => {
    // Ele faz algo
    fetchMovies(path)
    // return () => {
    //   // Ele faz algo quando o componente é desmontado
    // }
  }, [path])

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map(movie => {
          return (
            <img
              key={movie.id}
              src={`${imageHost}${
                isLarge ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
              className={`movie-card ${isLarge && 'movie-card-large'}`}
              onClick={() => handleOnclick(movie)}
            />
          )
        })}
      </div>
      {/* {trailerUrl && <ReactPlayer playing={true} url={trailerUrl} />} */}
      {trailerUrl && (
        <YouTube videoId={trailerUrl} url={trailerUrl} opts={opts} />
      )}
    </div>
  )
}

export default Row
