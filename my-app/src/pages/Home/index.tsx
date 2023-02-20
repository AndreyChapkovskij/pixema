import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import useDebounce from '../../hooks/useDebounce'

import { fetchMovies } from '../../redux/moviesSlice'

import MoviesList from '../../components/MoviesList'
import FilterMarks from '../../components/FilterMarks'
import Sidebar from '../../components/Sidebar'
import Filters from '../../components/Filters'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const filter = useAppSelector((state) => state.filterReducer.filter)

  const fetchWithDebounce = useDebounce((e) => {
    currentPage === 1
      ? dispatch(
          fetchMovies({ filter, currentPage: 1, search: e.target.value })
        )
      : setCurrentPage(1)

    setSearch(e.target.value)
  }, 1000)

  useEffect(() => {
    dispatch(fetchMovies({ filter, currentPage, search }))
  }, [filter, currentPage])

  return (
    <Helmet title={'Home'}>
      <Header fetchWithDebounce={fetchWithDebounce} search={search} />
      <FilterMarks setCurrentPage={setCurrentPage} filter={filter} />
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

export default Home
