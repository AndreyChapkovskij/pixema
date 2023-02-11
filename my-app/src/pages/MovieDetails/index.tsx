import styles from './movie.module.scss'

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import {
  fetchMovieById,
  fetchMoviesRecommend,
} from '../../redux/movieDetailsSlice'

import Recommendations from '../../components/Recommendations'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'
import Genres from '../../components/UI/Genres'
import MovieCardDetails from '../../components/UI/MovieCardDetails'
import MovieCardDetailsMobile from '../../components/UI/MovieCardDetailsMobile.tsx'

function MovieDetails() {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id))
      dispatch(fetchMoviesRecommend())
    }
  }, [id])

  const movie = useAppSelector((state) => state.movieDetailsReducer.movieItem)
  const moviesRecommend = useAppSelector(
    (state) => state.movieDetailsReducer.moviesRecommend
  )

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={movie?.title ?? 'movieDetails'}>
      <Header />
      <section className={isTheme ? styles.active : ''}>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <div className={styles.movie}>
              {movie ? (
                <>
                  <MovieCardDetails movie={movie} />
                  <div className={styles.movie__info}>
                    <Genres genres={movie.genres} />
                    <h2>{movie.title}</h2>
                    <div className={styles.marks}>
                      <div className={styles.rating}>
                        <span>{movie.rating}</span>
                      </div>
                      <div className={styles.imdb}>
                        <span>IMDb</span>
                        <span>{movie.imdb}</span>
                      </div>
                      <div className={styles.duration}>
                        <span>{movie.duration} min</span>
                      </div>
                    </div>
                    <MovieCardDetailsMobile movie={movie} />
                    <div className={styles.desc}>
                      <p>{movie.description}</p>
                    </div>
                    <table>
                      <tbody>
                        {Object.keys(movie.info).map((key) => {
                          return (
                            <tr>
                              <th>{key}</th>
                              <td>{movie.info[key]}</td>
                            </tr>
                          )
                        })}
                        <tr>
                          <th>Year</th>
                          <td>{movie.year}</td>
                        </tr>
                        <tr>
                          <th>Country</th>
                          <td>
                            {movie.country.map((item) => item.name + ' ')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Recommendations moviesRecommend={moviesRecommend} />
                  </div>
                </>
              ) : (
                'not found'
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default MovieDetails
