import React, { useEffect } from 'react'
import categories, { getMovies } from '../api'
import './Banner.css'

export default function Banner() {
  const [movie, setMovie] = React.useState({})

  //  Um filme aleatorio
  const fetchRandomMovie = async () => {
    try {
      const netflixOriginalCategory = categories.find(
        category => category.name === 'netflixOriginals'
      )
      const data = await getMovies(netflixOriginalCategory.path)
      // const randomMovieIndex = data?.results[Math.floor(Math.random() * data.results.length)]
      // const randomMovieIndex = Math.floor(Math.random() * data.results.length)
      // setMovie(data?.results[randomMovieIndex])
      const movies = data?.results
      const randomMovieIndex = Math.floor(Math.random() * movies.length)
      setMovie(movies[randomMovieIndex])
    } catch (error) {
      console.log('Banner error fetchRandomMovie: ', error)
    }
  }

  useEffect(() => {
    fetchRandomMovie()
  }, [])

  const backgroundImageMovieDestaque = `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`

  function truncate(str, num) {
    // Se a string que a gente passar for maior que o numero(limite) ele vai cortar a string e adicionar um ... no final, se não ele vai retornar a string inteira
    return str?.length > num ? str.slice(0, num - 1) + '...' : str
  }

  return (
    <header
      className="banner-container"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `${backgroundImageMovieDestaque}`,
        roundPosition: 'center-center'
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {/* O filme nem sempre tem o nome do titulo: por isso a gente pega o title dele
          ou o nome dele ou o original nome dele */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-button-container">
          <button className="banner-button">Assistir</button>
          <button className="banner-button">Minha Lista</button>
        </div>
        <div className="banner-description">
          <h2>{truncate(movie?.overview, 150)}</h2>
        </div>
      </div>
    </header>
  )
}
