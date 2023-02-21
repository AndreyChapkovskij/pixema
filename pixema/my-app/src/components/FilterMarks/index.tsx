import styles from './filtermarks.module.scss'

import {
  changeCountry,
  changeGenres,
  changeGroupByRating,
  changeGroupByYear,
  changeShortSearch,
  changeSortBy,
} from '../../redux/filterSlice'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

interface IFilterMarksProps {
  setCurrentPage: (arg: number) => void
}

const FilterMarks: React.FC<IFilterMarksProps> = ({ setCurrentPage }) => {
  const dispatch = useAppDispatch()

  const filter = useAppSelector((state) => state.filterReducer.filter)

  return (
    <section>
      <div className="container">
        <ul className={styles.marks}>
          {filter.sortBy && (
            <li>
              <span>{filter.sortBy}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  dispatch(changeSortBy(''))
                  setCurrentPage(1)
                }}
              ></i>
            </li>
          )}
          {filter.shortSearch && (
            <li>
              <span>{filter.shortSearch}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  dispatch(changeShortSearch(''))
                  setCurrentPage(1)
                }}
              ></i>
            </li>
          )}
          {filter.country && (
            <li>
              <span>{filter.country}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  dispatch(changeCountry(''))
                  setCurrentPage(1)
                }}
              ></i>
            </li>
          )}
          {filter.genres && filter.genres[0] && (
            <>
              {filter.genres.map((genre) => (
                <li>
                  <span>{genre.name}</span>
                  <i
                    className="ri-close-line"
                    onClick={() => {
                      filter.genres &&
                        dispatch(
                          changeGenres(
                            filter.genres.filter((item) => item.id !== genre.id)
                          )
                        )
                      setCurrentPage(1)
                    }}
                  ></i>
                </li>
              ))}
            </>
          )}
          {filter.groupByRating && filter.groupByRating[0] && (
            <li>
              <span>{filter.groupByRating.join('-')}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  dispatch(changeGroupByRating(['', '']))
                  setCurrentPage(1)
                }}
              ></i>
            </li>
          )}
          {filter.groupByYear && filter.groupByYear[0] && (
            <li>
              <span>{filter.groupByYear.join('-')}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  dispatch(changeGroupByYear(['', '']))
                  setCurrentPage(1)
                }}
              ></i>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

export default FilterMarks
