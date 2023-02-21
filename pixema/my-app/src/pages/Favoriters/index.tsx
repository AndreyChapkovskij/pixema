import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEffect, useState } from 'react'

import {
  changeMovieItems,
  fetchMoviesFavoriters,
} from '../../redux/moviesSlice'

import Sidebar from '../../components/Sidebar'
import MoviesList from '../../components/MoviesList'
import Filters from '../../components/Filters'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Favoriters: React.FC = () => {
  const dispatch = useAppDispatch()

  const favoriteItemsId = useAppSelector(
    (state) => state.moviesReducer.favoriteItemsId
  )

  const filter = useAppSelector((state) => state.filterReducer.filter)
  const search = useAppSelector((state) => state.searchReducer.search)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    favoriteItemsId && favoriteItemsId[0]
      ? dispatch(
          fetchMoviesFavoriters({
            filter,
            currentPage,
            favoriteItemsId,
          })
        )
      : dispatch(changeMovieItems([]))
  }, [filter, currentPage])

  return (
    <Helmet title={'Favoriters'}>
      <Header />
      <section>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <MoviesList
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
            />
            <Filters
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Favoriters
