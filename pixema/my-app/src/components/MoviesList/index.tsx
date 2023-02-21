import styles from './movieslist.module.scss'

import { useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import NotFound from '../NotFound'
import FilterMarks from '../FilterMarks'
import MovieCard from '../UI/MovieCard'
import SearchResult from '../UI/SearchResult'
import Spinner from '../UI/Icons/Spinner'
import Loader from '../UI/Icons/Loader'

interface IMovieListProps {
  setCurrentPage: (arg: number) => void
  currentPage: number
  search: string
}

const MoviesList: React.FC<IMovieListProps> = ({
  setCurrentPage,
  currentPage,
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

  return (
    <div className={styles.movieList}>
      {search && <SearchResult search={search} />}
      <FilterMarks setCurrentPage={setCurrentPage} />

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
                {loading && <Spinner />}
              </div>
            </div>
          )}
        </>
      ) : (
        <>{loading ? <Loader /> : <NotFound />}</>
      )}
    </div>
  )
}

export default MoviesList
