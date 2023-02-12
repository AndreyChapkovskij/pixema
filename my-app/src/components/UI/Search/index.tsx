import styles from './search.module.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import { setIsFilter } from '../../../redux/filterSlice'

interface ISearchProps {
  fetchWithDebounce?: (e: React.ChangeEvent<HTMLInputElement>) => void
  search?: string
  setSearch?: (arg: string) => void
}

const Search: React.FC<ISearchProps> = ({
  fetchWithDebounce,
  search,
  setSearch,
}) => {
  const dispatch = useAppDispatch()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={isTheme ? styles.search + ' ' + styles.active : styles.search}
    >
      <input
        type="text"
        disabled={!fetchWithDebounce}
        value={search}
        onChange={(e) => {
          fetchWithDebounce && fetchWithDebounce(e)
          setSearch && setSearch(e.target.value)
        }}
      />

      {search ? (
        <div className={styles.search__icon}>
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
