import styles from './dashboard.module.scss'

import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { useForm } from 'react-hook-form'
import { useState, useEffect, FormEvent } from 'react'

import { motion } from 'framer-motion'

import { fetchCountry } from '../../redux/countrySlice'
import {
  fetchMovieCreate,
  changeSuccessMessage,
} from '../../redux/createMovieSlice'

import { IGenres } from '../../interface.app'

import Genres from '../../components/UI/Inputs/FilterInputs/Genres/genres'
import Country from '../../components/UI/Inputs/FilterInputs/Country/country'
import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Error from '../../components/UI/Inputs/error'
import Popup from '../../components/Popup'

interface IMovieInputs {
  title: string
  rating: string
  imdb: string
  duration: string
  img: FileList
  description: string
  year: string
  trends: string
  genres: string
  country: string
}
interface IInfo {
  title: string
  description: string
  id: number
}

function Dashboard() {
  const dispatch = useAppDispatch()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  const countries = useAppSelector((state) => state.countryReducer.countryItems)
  const successMessage = useAppSelector(
    (state) => state.createMovieReducer.successMessage
  )

  const [genreAdded, setGenreAdded] = useState<IGenres[]>([])

  const setIsModal = (arg: boolean): void => {
    !arg && dispatch(changeSuccessMessage(''))
  }

  useEffect(() => {
    !countries.length && dispatch(fetchCountry())
  }, [])

  useEffect(() => {
    if (successMessage) {
      reset()
      setGenreAdded([])
      setInfo([])
    }
  }, [successMessage])

  const [info, setInfo] = useState<IInfo[]>([])

  const handleAddInfo = (e: FormEvent): void => {
    e.preventDefault()
    setInfo([...info, { title: '', description: '', id: Date.now() }])
  }
  const handleDelInfo = (e: FormEvent, id: number): void => {
    e.preventDefault()
    setInfo(info.filter((i) => i.id !== id))
  }
  const changeInfo = (title: string, description: string, id: number) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [title]: description } : i)))
  }

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    setFocus,
    setError,
    formState: { errors, isValid },
  } = useForm<IMovieInputs>({ mode: 'onChange' })

  const onSubmitCreate = handleSubmit((createdFormData) => {
    const genres = genreAdded.map((genre) => genre.id).toString()
    const country = countries.find(
      (country) => country.name === createdFormData.country
    )

    genreAdded.length > 3 && setError('genres', { message: 'Max 3 genres' })

    const form = new FormData()
    form.append('title', createdFormData.title)
    form.append('rating', createdFormData.rating)
    form.append('imdb', createdFormData.imdb)
    form.append('img', createdFormData.img[0])
    form.append('duration', createdFormData.duration)
    form.append('genres', `[${genres}]`)
    form.append('description', createdFormData.description)
    form.append('trends', createdFormData.trends ? '1' : '0')
    form.append('country', `[${country?.id}]`)
    form.append('year', createdFormData.year)

    info && info.map((item) => form.append(item.title, item.description))

    isValid && dispatch(fetchMovieCreate(form))
  })

  return (
    <Helmet title={'Dashboard'}>
      <Header />
      <section className={isTheme ? styles.active : ''}>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <section className={styles.dashboard}>
              <h2>Create new movie</h2>
              <form onSubmit={onSubmitCreate}>
                <div className={styles.form__inputs}>
                  <input placeholder="title" {...register('title', {})} />
                  {errors.title?.message && (
                    <Error error={errors.title?.message} />
                  )}
                </div>

                <div className={styles.form__file}>
                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    htmlFor="fileUpload"
                  >
                    <span>
                      <i className="ri-download-2-fill"></i>
                    </span>
                    <span>
                      {watch('img')?.length
                        ? `${watch('img').length} files are chosen: ${
                            watch('img').length === 1 && watch('img')[0].name
                          }`
                        : 'Choose your image'}
                    </span>
                  </motion.label>
                  <input type="file" id="fileUpload" {...register('img', {})} />
                  {errors.img?.message && <Error error={errors.img?.message} />}
                </div>
                <Genres
                  register={register}
                  name="genres"
                  error={errors.genres?.message}
                  genreAdded={genreAdded}
                  setGenreAdded={setGenreAdded}
                  setValue={setValue}
                  setFocus={setFocus}
                  watch={watch}
                  label="Genres"
                />
                <Country
                  control={control}
                  name="country"
                  countries={countries}
                />
                <div className={styles.form__inputs}>
                  <input placeholder="imdb" {...register('imdb', {})} />
                  {errors.imdb?.message && (
                    <Error error={errors.imdb?.message} />
                  )}
                </div>
                <div className={styles.form__inputs}>
                  <input placeholder="duration" {...register('duration', {})} />
                  {errors.duration?.message && (
                    <Error error={errors.duration?.message} />
                  )}
                </div>
                <div className={styles.description}>
                  <textarea
                    placeholder="description"
                    {...register('description', {})}
                  />
                  {errors.description?.message && (
                    <Error error={errors.description?.message} />
                  )}
                </div>
                <div className={styles.form__inputs}>
                  <input placeholder="rating" {...register('rating', {})} />
                  {errors.rating?.message && (
                    <Error error={errors.rating?.message} />
                  )}
                </div>
                <div className={styles.form__inputs}>
                  <input placeholder="year" {...register('year', {})} />
                  {errors.year?.message && (
                    <Error error={errors.year?.message} />
                  )}
                </div>

                <div className={styles.form__trends}>
                  <label
                    className={
                      watch('trends')
                        ? styles.toggle + ' ' + styles.active
                        : styles.toggle
                    }
                    htmlFor="trends"
                  >
                    trends
                  </label>
                  <input
                    id="trends"
                    type={'checkbox'}
                    placeholder="trends"
                    {...register('trends', {})}
                  />
                  {errors.trends?.message && (
                    <Error error={errors.trends?.message} />
                  )}
                </div>

                {info.map((item) => (
                  <div className={styles.form__info}>
                    <input
                      placeholder="title"
                      value={item.title}
                      onChange={(e) =>
                        changeInfo('title', e.target.value, item.id)
                      }
                    />
                    <input
                      placeholder="value"
                      value={item.description}
                      onChange={(e) =>
                        changeInfo('description', e.target.value, item.id)
                      }
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => handleDelInfo(e, item.id)}
                    >
                      <i className="ri-close-line"></i>
                    </motion.button>
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={styles.form__addInfo}
                  onClick={(e) => handleAddInfo(e)}
                >
                  <i className="ri-add-line"></i>
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={styles.form__submit}
                >
                  <input type={'submit'} value="Create" />
                </motion.div>
              </form>
            </section>
          </div>
        </div>
        <Popup
          title={'Server info'}
          isModal={successMessage}
          setIsModal={setIsModal}
        >
          <span className="success">{successMessage}</span>
        </Popup>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Dashboard
