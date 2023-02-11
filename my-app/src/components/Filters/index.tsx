import styles from './filters.module.scss'

import { RefObject, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchGenres, clearGenres } from '../../redux/genresSlice'
import { fetchCountry } from '../../redux/countrySlice'
import {
  setIsFilter,
  setIsFilterWasChanged,
  clearFilter,
  changeGenres,
  changeCountry,
  changeGroupByRating,
  changeGroupByYear,
  changeShortSearch,
  changeSortBy,
} from '../../redux/filterSlice'

import { useForm } from 'react-hook-form'
import Year from '../UI/Inputs/year'
import Rating from '../UI/Inputs/rating'
import Error from '../UI/Inputs/error'

interface IFilterProps {
  setCurrentPage: (arg: number) => void
  currentPage: number
}

interface IValidateInputs {
  yearFrom: string
  yearTo: string
  ratingFrom: string
  ratingTo: string
}

const Filters: React.FC<IFilterProps> = ({ setCurrentPage, currentPage }) => {
  const dispatch = useAppDispatch()

  const genreInput: RefObject<HTMLInputElement> = useRef(null)

  const filter = useAppSelector((state) => state.filterReducer.filter)
  const isFilter = useAppSelector((state) => state.filterReducer.isFilter)
  const isFilterWasChanged = useAppSelector(
    (state) => state.filterReducer.isFilterWasChanged
  )

  const [genreValue, setGenreValue] = useState('') // input

  const genresItems = useAppSelector((state) => state.genresReducer.genreItems)
  const countries = useAppSelector((state) => state.countryReducer.countryItems)

  useEffect(() => {
    !countries.length && dispatch(fetchCountry())
  }, [])

  useEffect(() => {
    if (genreValue) {
      const genreAdded = filter.genres // Lose context
      dispatch(fetchGenres({ genreValue, genreAdded }))
    } else {
      dispatch(clearGenres())
    }
  }, [genreValue, filter.genres])

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<IValidateInputs>({ mode: 'onChange' })

  const onSubmitFilter = handleSubmit(
    ({ yearFrom, yearTo, ratingFrom, ratingTo }) => {
      if ((yearFrom && !yearTo) || (yearTo && !yearFrom)) {
        !yearFrom
          ? setError('yearFrom', { message: 'Fill in yearFrom input' })
          : setError('yearTo', { message: 'Fill in yearTo input' })
      } else if ((ratingFrom && !ratingTo) || (ratingTo && !ratingFrom)) {
        !ratingFrom
          ? setError('ratingFrom', { message: 'Fill in ratingFrom input' })
          : setError('ratingTo', { message: 'Fill in ratingTo input' })
      } else {
        yearFrom && dispatch(changeGroupByYear([yearFrom, yearTo]))
        ratingFrom && dispatch(changeGroupByRating([ratingFrom, ratingTo]))

        dispatch(setIsFilter(false))
        dispatch(setIsFilterWasChanged(!isFilterWasChanged))
        currentPage !== 1 && setCurrentPage(1)
      }
    }
  )

  useEffect(() => {
    setValue('ratingFrom', filter.groupByRating[0])
    setValue('ratingTo', filter.groupByRating[1])
    setValue('yearFrom', filter.groupByYear[0])
    setValue('yearTo', filter.groupByYear[1])
  }, [isFilterWasChanged])

  return (
    <div
      className={
        isFilter ? styles.active + ' ' + styles.filters : styles.filters
      }
    >
      <div className={styles.filters__wrap}>
        <div className={styles.top}>
          <h2 className={styles.title}>Filtres</h2>
          <div
            className={styles.close}
            onClick={() => {
              dispatch(setIsFilter(false))
            }}
          >
            <i className="ri-close-line"></i>
          </div>
        </div>
        <form onSubmit={onSubmitFilter}>
          <div className={styles.sort}>
            <span>Sort by</span>
            <div className={styles.sort__types}>
              <div
                className={filter.sortBy === 'rating' ? styles.active : ''}
                onClick={() => {
                  dispatch(changeSortBy('rating'))
                }}
              >
                <span>Rating</span>
              </div>
              <div
                className={filter.sortBy === 'year' ? styles.active : ''}
                onClick={() => {
                  dispatch(changeSortBy('year'))
                }}
              >
                <span>Year</span>
              </div>
            </div>
          </div>

          <div className={styles.name}>
            <span>Full or short movie name</span>
            <input
              value={filter.shortSearch}
              onChange={(e) => dispatch(changeShortSearch(e.target.value))}
              type="text"
              placeholder="Your text"
            />
          </div>

          <div className={styles.genres}>
            <span>Sort by</span>
            <div
              className={styles.genres__types}
              onClick={() => genreInput.current?.focus()}
            >
              {filter.genres &&
                filter.genres.map((genre) => (
                  <div className={styles.genres__marks} key={genre.id}>
                    <span>{genre.name}</span>
                    <i
                      className="ri-close-line"
                      onClick={() => {
                        dispatch(
                          changeGenres(
                            filter.genres.filter((item) => item.id !== genre.id)
                          )
                        )
                      }}
                    ></i>
                  </div>
                ))}

              <div className={styles.genres__search}>
                <input
                  ref={genreInput}
                  type="text"
                  value={genreValue}
                  onChange={(e) => {
                    setGenreValue(e.target.value)
                    if (genreValue === genresItems[0]?.name) {
                      setGenreValue('')
                      dispatch(changeGenres([...filter.genres, genresItems[0]]))
                    }
                  }}
                />
                <ul className={genresItems.length ? styles.active : ''}>
                  {genresItems.map((genre) => (
                    <li
                      onClick={() => {
                        dispatch(changeGenres([...filter.genres, genre]))
                        setGenreValue('')
                      }}
                      key={genre.id}
                    >
                      <span>{genre.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.years}>
            <span>Years</span>
            <div className={styles.years__input}>
              <Year register={register} placeholder="From" name="yearFrom" />
              <Year register={register} placeholder="To" name="yearTo" />
            </div>
            {errors.yearFrom?.message && (
              <Error error={errors.yearFrom.message} />
            )}
            {errors.yearTo?.message && <Error error={errors.yearTo.message} />}
          </div>
          <div className={styles.rating}>
            <span>Rating</span>
            <div className={styles.rating__input}>
              <Rating
                register={register}
                placeholder="From"
                name="ratingFrom"
              />
              <Rating register={register} placeholder="To" name="ratingTo" />
            </div>
            {errors.ratingFrom?.message && (
              <Error error={errors.ratingFrom.message} />
            )}
            {errors.ratingTo?.message && (
              <Error error={errors.ratingTo.message} />
            )}
          </div>
          <div className={styles.country}>
            <span>Country</span>
            <select
              value={filter.country}
              onClick={() => !countries.length && dispatch(fetchCountry())}
              onChange={(e) => dispatch(changeCountry(e.target.value))}
            >
              <option>Select country</option>
              {countries?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.btn}>
            <button
              className={styles.btn__clear}
              onClick={(e) => {
                e.preventDefault()
                dispatch(setIsFilter(false))
                dispatch(clearFilter())
                dispatch(setIsFilterWasChanged(!isFilterWasChanged))
              }}
            >
              Clear filter
            </button>
            <button className={styles.btn__show} type="submit">
              Show results
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filters
