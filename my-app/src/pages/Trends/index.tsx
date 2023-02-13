import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchMoviesTrends } from '../../redux/moviesSlice'

import useDebounce from '../../hooks/useDebounce'

import MoviesList from '../../components/MoviesList'
import Sidebar from '../../components/Sidebar'
import Filters from '../../components/Filters'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Trends: React.FC = () => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const filter = useAppSelector((state) => state.filterReducer.filter)

  const fetchWithDebounce = useDebounce((e) => {
    currentPage === 1
      ? dispatch(
          fetchMoviesTrends({ filter, currentPage: 1, search: e.target.value })
        )
      : setCurrentPage(1)

    setSearch(e.target.value)
  }, 1000)

  useEffect(() => {
    dispatch(fetchMoviesTrends({ filter, currentPage, search }))
  }, [filter, currentPage])

  return (
    <Helmet title={'Trends'}>
      <Header fetchWithDebounce={fetchWithDebounce} search={search} />
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

export default Trends
