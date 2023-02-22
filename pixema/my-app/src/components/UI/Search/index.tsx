import styles from './search.module.scss'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import { setIsFilter } from '../../../redux/filterSlice'
import { changeSearch, clearSearchItems } from '../../../redux/searchSlice'

import Genres from '../../UI/Genres'

interface ISearchProps {
  fetchWithDebounce: (arg: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<ISearchProps> = ({ fetchWithDebounce }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation().pathname

  const searchItems = useAppSelector((state) => state.searchReducer.searchItems)
  const search = useAppSelector((state) => state.searchReducer.search)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={isTheme ? styles.search + ' ' + styles.active : styles.search}
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value)
          fetchWithDebounce(e)
        }}
      />
      {searchItems[0] && searchInput && (
        <ul className={styles.dropdown}>
          {searchItems.map((movie) => (
            <li key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <div>
                <img
                  src={'http://localhost:5000/' + movie.img}
                  alt={movie.title}
                />
              </div>
              <h3>{movie.title} </h3>
              <Genres genres={movie.genres} />
            </li>
          ))}
          <li
            onClick={() => {
              dispatch(changeSearch(searchInput))
              dispatch(clearSearchItems())
              location !== '/home' && navigate('/home')
            }}
          >
            <span>show all</span>
          </li>
        </ul>
      )}
      {searchInput ? (
        <div
          className={styles.search__icon}
          onClick={() => {
            dispatch(changeSearch(searchInput))
            dispatch(clearSearchItems())
            location !== '/home' && navigate('/home')
          }}
        >
          <i className="ri-search-line"></i>
        </div>
      ) : (
        <div
          className={styles.search__icon}
          onClick={() => {
            dispatch(setIsFilter(true))
            window.scrollTo(0, 0)
          }}
        >
          <i className="ri-menu-3-line"></i>
        </div>
      )}
    </div>
  )
}

export default Search
