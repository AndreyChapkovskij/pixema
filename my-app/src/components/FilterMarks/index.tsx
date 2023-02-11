import styles from './filtermarks.module.scss'

import {
  changeCountry,
  changeGenres,
  changeGroupByRating,
  changeGroupByYear,
  changeShortSearch,
  changeSortBy,
  IFilter,
  setIsFilterWasChanged,
} from '../../redux/filterSlice'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

interface IFilterMarksProps {
  filter: IFilter
  setCurrentPage: (arg: number) => void
}

const FilterMarks: React.FC<IFilterMarksProps> = ({
  filter,
  setCurrentPage,
}) => {
  const dispatch = useAppDispatch()

  const isFilterWasChanged = useAppSelector(
    (state) => state.filterReducer.isFilterWasChanged
  )
  return (
    <ul className={styles.marks}>
      {filter.sortBy && (
        <li>
          <span>{filter.sortBy}</span>
          <i
            className="ri-close-line"
            onClick={() => {
              dispatch(changeSortBy(''))
              dispatch(setIsFilterWasChanged(!isFilterWasChanged))
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
              dispatch(setIsFilterWasChanged(!isFilterWasChanged))
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
              dispatch(setIsFilterWasChanged(!isFilterWasChanged))
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
                  dispatch(setIsFilterWasChanged(!isFilterWasChanged))
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
              dispatch(setIsFilterWasChanged(!isFilterWasChanged))
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
              dispatch(setIsFilterWasChanged(!isFilterWasChanged))
              setCurrentPage(1)
            }}
          ></i>
        </li>
      )}
    </ul>
  )
}

export default FilterMarks
