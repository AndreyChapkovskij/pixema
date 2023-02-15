import styles from './movie.module.scss'

import { useEffect, useState } from 'react'
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
import NotFound from '../../components/NotFound'
import TableInfo from '../../components/UI/TableInfo'
import Popup from '../../components/Popup'
import Social from '../../components/UI/Social'

function MovieDetails() {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const [isModal, setIsModal] = useState(false)

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
            {movie ? (
              <section className={styles.movie}>
                <MovieCardDetails movie={movie} setIsModal={setIsModal} />
                <div className={styles.movie__info}>
                  <Genres genres={movie.genres} />
                  <h2 className={styles.title}>{movie.title}</h2>
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
                  <div className={styles.desc}>
                    <p>{movie.description}</p>
                  </div>
                  <TableInfo movie={movie} />
                  <Recommendations moviesRecommend={moviesRecommend} />
                </div>
              </section>
            ) : (
              <NotFound />
            )}
          </div>
        </div>
        <Popup
          title={'social pixema'}
          isModal={isModal}
          setIsModal={setIsModal}
        >
          <Social />
        </Popup>
      </section>
      <Footer />
    </Helmet>
  )
}

export default MovieDetails
