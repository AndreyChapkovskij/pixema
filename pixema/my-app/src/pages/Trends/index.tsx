import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchMoviesTrends } from '../../redux/moviesSlice'

import MoviesList from '../../components/MoviesList'
import Sidebar from '../../components/Sidebar'
import Filters from '../../components/Filters'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Trends: React.FC = () => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)

  const filter = useAppSelector((state) => state.filterReducer.filter)
  const search = useAppSelector((state) => state.searchReducer.search)

  useEffect(() => {
    dispatch(fetchMoviesTrends({ filter, currentPage }))
  }, [filter, currentPage])

  return (
    <Helmet title={'Trends'}>
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

export default Trends
