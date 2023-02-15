import styles from './searchResult.module.scss'

import { useAppSelector } from '../../../hooks/redux'

interface ISearchResultProps {
  search: string
}

const SearchResult: React.FC<ISearchResultProps> = ({ search }) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <h3
      className={
        isTheme
          ? styles.searchResult + ' ' + styles.active
          : styles.searchResult
      }
    >
      Результаты по запросу: {search}
    </h3>
  )
}

export default SearchResult
