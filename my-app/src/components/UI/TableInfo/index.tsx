import styles from './tableInfo.module.scss'

import { IMovieDetails } from '../../../interface.app'

import { useAppSelector } from '../../../hooks/redux'

interface ITableInfoProps {
  movie: IMovieDetails
}

const TableInfo: React.FC<ITableInfoProps> = ({ movie }) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <table
      className={
        isTheme ? styles.tableInfo + ' ' + styles.active : styles.tableInfo
      }
    >
      <tbody>
        {Object.keys(movie.info).map((key) => {
          return (
            <tr>
              <th>{key}</th>
              <td>{movie.info[key]}</td>
            </tr>
          )
        })}
        <tr>
          <th>Year</th>
          <td>{movie.year}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{movie.country.map((item) => item.name + ' ')}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableInfo
