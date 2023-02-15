import styles from './movieslist.module.scss'

import { useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { IFilter } from '../../redux/filterSlice'

import FilterMarks from '../FilterMarks'
import MovieCard from '../UI/MovieCard'
import SearchResult from '../UI/SearchResult'
import NotFound from '../NotFound'
import Spinner from '../UI/Icons/Spinner'

interface IMovieListProps {
  setCurrentPage: (arg: number) => void
  currentPage: number
  filter: IFilter
  search: string
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

  return (
    <div className={styles.movieList}>
      {search && <SearchResult search={search} />}

      <FilterMarks filter={filter} setCurrentPage={setCurrentPage} />

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
        <NotFound />
      )}
    </div>
  )
}

export default MoviesList
