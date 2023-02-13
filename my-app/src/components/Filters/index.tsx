import styles from './filters.module.scss'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchGenres, clearGenres, IGenres } from '../../redux/genresSlice'
import { fetchCountry } from '../../redux/countrySlice'
import { setIsFilter, clearFilter, changeFilter } from '../../redux/filterSlice'

import { useForm } from 'react-hook-form'

import Year from '../UI/Inputs/FilterInputs/year'
import Rating from '../UI/Inputs/FilterInputs/rating'
import Country from '../UI/Inputs/FilterInputs/Country/country'
import Genres from '../UI/Inputs/FilterInputs/Genres/genres'
import SortBY from '../UI/Inputs/FilterInputs/SortBy/sortBy'
import ShortSearch from '../UI/Inputs/FilterInputs/ShortSearch/shortSearch'

interface IFilterProps {
  setCurrentPage: (arg: number) => void
  currentPage: number
}

interface IValidateInputs {
  yearFrom: string
  yearTo: string
  ratingFrom: string
  ratingTo: string
  country: string
  genres: string
  sortBy: string
  shortSearch: string
}

const Filters: React.FC<IFilterProps> = ({ setCurrentPage, currentPage }) => {
  const dispatch = useAppDispatch()

  const filter = useAppSelector((state) => state.filterReducer.filter)
  const isFilter = useAppSelector((state) => state.filterReducer.isFilter)

  const [genreAdded, setGenreAdded] = useState<IGenres[]>([]) // input

  const countries = useAppSelector((state) => state.countryReducer.countryItems)

  useEffect(() => {
    !countries.length && dispatch(fetchCountry())
  }, [])

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setFocus,
    setError,
    formState: { errors, isValid },
  } = useForm<IValidateInputs>({ mode: 'onChange' })

  useEffect(() => {
    if (watch('genres')) {
      const genreValue = watch('genres') // Lose context
      dispatch(fetchGenres({ genreValue, genreAdded }))
    } else {
      dispatch(clearGenres())
    }
  }, [watch('genres'), genreAdded])

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
        dispatch(
          changeFilter({
            genres: genreAdded,
            sortBy: getValues('sortBy'),
            shortSearch: getValues('shortSearch'),
            groupByYear: [getValues('yearFrom'), getValues('yearTo')],
            groupByRating: [getValues('ratingFrom'), getValues('ratingTo')],
            country: getValues('country'),
          })
        )
        dispatch(setIsFilter(false))
        currentPage !== 1 && setCurrentPage(1)
      }
    }
  )

  useEffect(() => {
    setValue('ratingFrom', filter.groupByRating[0])
    setValue('ratingTo', filter.groupByRating[1])
    setValue('yearFrom', filter.groupByYear[0])
    setValue('yearTo', filter.groupByYear[1])
    setValue('country', filter.country)
    setValue('sortBy', filter.sortBy)
    setValue('shortSearch', filter.shortSearch)
    setGenreAdded(filter.genres)
  }, [filter])

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
          <SortBY
            register={register}
            name="sortBy"
            error={errors.sortBy?.message}
            setValue={setValue}
            watch={watch}
          />
          <ShortSearch
            register={register}
            name="shortSearch"
            placeholder="Your text"
            error={errors.shortSearch?.message}
          />
          <Genres
            register={register}
            name="genres"
            error={errors.genres?.message}
            genreAdded={genreAdded}
            setGenreAdded={setGenreAdded}
            setValue={setValue}
            setFocus={setFocus}
            watch={watch}
          />
          <Year
            register={register}
            placeholder={['From', 'To']}
            name={['yearFrom', 'yearTo']}
            error={errors.yearFrom?.message || errors.yearTo?.message}
          />
          <Rating
            register={register}
            placeholder={['From', 'To']}
            name={['ratingFrom', 'ratingTo']}
            error={errors.ratingFrom?.message || errors.ratingTo?.message}
          />
          <Country control={control} name="country" countries={countries} />

          <div className={styles.btn}>
            <button
              className={styles.btn__clear}
              onClick={(e) => {
                e.preventDefault()
                dispatch(setIsFilter(false))
                dispatch(clearFilter())
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
