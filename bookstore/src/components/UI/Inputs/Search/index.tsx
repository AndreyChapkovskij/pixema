import styles from './search.module.scss'

import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { clearSearchItems, changeSearch } from '../../../../redux/productSlice'

interface ISearchProps {
  fetchWithDebounce: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<ISearchProps> = ({ fetchWithDebounce }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname

  const [inputValue, setInputValue] = useState('')

  const search = useAppSelector((state) => state.productsReducer.search)
  const searchItems = useAppSelector(
    (state) => state.productsReducer.searchItems
  )

  useEffect(() => {
    search && setInputValue(search)
  }, [])

  return (
    <div className={styles.search}>
      <input
        placeholder="Search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          fetchWithDebounce && fetchWithDebounce(e)
        }}
      />
      {searchItems[0] && inputValue && (
        <ul className={styles.dropdown}>
          {searchItems.map((product) => (
            <li
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div>
                <img
                  src={`http://localhost:3001/` + product.image}
                  alt={product.title}
                />
              </div>
              <h3>{product.title}</h3>
            </li>
          ))}
          <li
            onClick={() => {
              location !== '/' && navigate('/')
              !inputValue && setInputValue(search)
              dispatch(changeSearch(inputValue))
              dispatch(clearSearchItems())
            }}
          >
            all results
          </li>
        </ul>
      )}
      <div
        className={styles.icon}
        onClick={() => {
          location !== '/' && navigate('/')
          !inputValue && setInputValue(search)
          dispatch(changeSearch(inputValue))
          dispatch(clearSearchItems())
        }}
      >
        <i className="ri-search-line"></i>
      </div>
    </div>
  )
}

export default Search
