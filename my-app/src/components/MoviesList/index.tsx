import styles from './movieslist.module.scss'

import { useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import imageEmptyDark from '../../assets/images/imageEmptyDark.png'
import imageEmptyWhite from '../../assets/images/imageEmptyWhite.png'

import { IFilter } from '../../redux/filterSlice'

import FilterMarks from '../FilterMarks'
import MovieCard from '../UI/MovieCard'

interface IMovieListProps {
  setCurrentPage: (arg: number) => void
  currentPage: number
  filter: IFilter
  search?: string
}

const MoviesList: React.FC<IMovieListProps> = ({
  setCurrentPage,
  currentPage,
  filter,
  search,
}) => {
  const loading = useAppSelector((state) => state.moviesReducer.loading)

  const movies = useAppSelector((state) => state.moviesReducer.movieItems)
  const totalPages = useAppSelector((state) => state.moviesReducer.totalPages)

  // Auto scroll
  const { ref, inView, entry } = useInView({
    threshold: 0.8,
    // triggerOnce: true,
  })

  useEffect(() => {
    if (inView && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [inView])
  // -- Auto scroll

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  return (
    <section className={styles.movieList}>
      {search && (
        <h3
          className={
            isTheme
              ? styles.searchTitle + ' ' + styles.active
              : styles.searchTitle
          }
        >
          Результаты по запросу: {search}
        </h3>
      )}
      {filter && (
        <FilterMarks filter={filter} setCurrentPage={setCurrentPage} />
      )}
      {movies.length ? (
        <>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          {(currentPage < totalPages || loading) && (
            <div className={styles.loading} ref={ref}>
              <div
                onClick={() => {
                  setCurrentPage(currentPage + 1)
                }}
              >
                <span>Show more</span>
                {loading && (
                  <svg className={styles.spinner} viewBox="0 0 50 50">
                    <circle
                      className={styles.path}
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke-width="5"
                    ></circle>
                  </svg>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <div>
            {isTheme ? (
              <img src={imageEmptyDark} alt="" />
            ) : (
              <img src={imageEmptyWhite} alt="" />
            )}
          </div>
          <span>Not found</span>
        </div>
      )}
    </section>
  )
}

export default MoviesList
