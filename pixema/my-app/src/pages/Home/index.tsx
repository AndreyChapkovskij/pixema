import React, { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchMovies } from '../../redux/moviesSlice'

import MoviesList from '../../components/MoviesList'
import Sidebar from '../../components/Sidebar'
import Filters from '../../components/Filters'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)

  const search = useAppSelector((state) => state.searchReducer.search)
  const filter = useAppSelector((state) => state.filterReducer.filter)

  useEffect(() => {
    dispatch(fetchMovies({ filter, currentPage, search }))
  }, [filter, currentPage, search])

  return (
    <Helmet title={'Home'}>
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
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
