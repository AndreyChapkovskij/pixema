import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEffect, useState } from 'react'

import {
  changeMovieItems,
  fetchMoviesFavoriters,
} from '../../redux/moviesSlice'

import useDebounce from '../../hooks/useDebounce'

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
  const isFilterWasChanged = useAppSelector(
    (state) => state.filterReducer.isFilterWasChanged
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const fetchWithDebounce = useDebounce((e) => {
    currentPage === 1 && favoriteItemsId && favoriteItemsId[0]
      ? dispatch(
          fetchMoviesFavoriters({
            filter,
            currentPage: 1,
            search: e.target.value,
            favoriteItemsId,
          })
        )
      : setCurrentPage(1)
  }, 1000)

  useEffect(() => {
    favoriteItemsId && favoriteItemsId[0]
      ? dispatch(
          fetchMoviesFavoriters({
            filter,
            currentPage,
            search,
            favoriteItemsId,
          })
        )
      : dispatch(changeMovieItems([]))
  }, [isFilterWasChanged, currentPage])

  return (
    <Helmet title={'Favoriters'}>
      <Header
        fetchWithDebounce={fetchWithDebounce}
        search={search}
        setSearch={setSearch}
      />
      <section>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <MoviesList
              filter={filter}
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
