import styles from './dashboard.module.scss'

import { useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Error from '../../components/UI/Inputs/error'
import Country from '../../components/UI/Inputs/FilterInputs/Country/country'

import { IMovieDetails } from '../../redux/movieDetailsSlice'
import { IMovieInfo } from '../../redux/movieDetailsSlice'
import { useAppDispatch } from '../../hooks/redux'
import { fetchCountry } from '../../redux/countrySlice'
import { fetchMovieCreate } from '../../redux/createMovieSlice'
import Genres from '../../components/UI/Inputs/FilterInputs/Genres/genres'
import { IGenres } from '../../redux/genresSlice'

interface IMovieInputs {
  [key: string]: string

  // title: string
  // rating: string
  // imdb: string
  // duration: string
  img: FileList
  // description: string
  // year: string
  // trends: string
  // genres: string
  // country: string
  // boxoffice: string
  // production: string
  // actors: string
  // director: string
  // writers: string
  // released: string
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

  useEffect(() => {
    !countries.length && dispatch(fetchCountry())
  }, [])

  const [info, setInfo] = useState<IInfo[]>([])

  const handleAddInfo = (): void => {
    setInfo([...info, { title: '', description: '', id: Date.now() }])
  }
  const handleDelInfo = (id: number): void => {
    setInfo(info.filter((i) => i.id !== id))
  }

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
  } = useForm<IMovieInputs>({ mode: 'onChange' })

  const onSubmitCreate = handleSubmit((createdFormData) => {
    const genres = genreAdded.map((genre) => genre.id).toString()
    const country = countries.find(
      (country) => country.name === createdFormData.country
    )

    const form = new FormData()
    form.append('title', createdFormData.title)
    form.append('rating', createdFormData.rating)
    form.append('imdb', createdFormData.imdb)
    form.append('img', createdFormData.img[0])
    form.append('duration', createdFormData.duration)
    form.append('genres', `[${genres}]`)
    form.append('description', createdFormData.description)
    form.append('trends', createdFormData.trends)
    form.append('country', `[${country?.id}]`)
    form.append('year', createdFormData.year)
    form.append('released', createdFormData.released)
    form.append('boxoffice', createdFormData.boxoffice)
    form.append('production', createdFormData.production)
    form.append('actors', createdFormData.actors)
    form.append('director', createdFormData.director)
    form.append('writers', createdFormData.writers)

    const data = {
      ...createdFormData,
      country: `[${country?.id}]`,
      genres: `[${genres}]`,
      img: createdFormData.img[0],
    }

    country?.id && dispatch(fetchMovieCreate(form))
    console.log(data)
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
              <span>{successMessage && successMessage}</span>

              <form onSubmit={onSubmitCreate}>
                <div>
                  <input placeholder="title" {...register('title', {})} />
                  {errors.title?.message && (
                    <Error error={errors.title?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="rating" {...register('rating', {})} />
                  {errors.rating?.message && (
                    <Error error={errors.rating?.message} />
                  )}
                </div>
                <div>
                  <input type="file" {...register('img', {})} />
                  {errors.img?.message && <Error error={errors.img?.message} />}
                </div>
                <div>
                  <input placeholder="imdb" {...register('imdb', {})} />
                  {errors.imdb?.message && (
                    <Error error={errors.imdb?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="duration" {...register('duration', {})} />
                  {errors.duration?.message && (
                    <Error error={errors.duration?.message} />
                  )}
                </div>
                <div>
                  <input
                    placeholder="description"
                    {...register('description', {})}
                  />
                  {errors.description?.message && (
                    <Error error={errors.description?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="year" {...register('year', {})} />
                  {errors.year?.message && (
                    <Error error={errors.year?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="released" {...register('released', {})} />
                  {errors.released?.message && (
                    <Error error={errors.released?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="trends" {...register('trends', {})} />
                  {errors.trends?.message && (
                    <Error error={errors.trends?.message} />
                  )}
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
                />
                <Country
                  control={control}
                  name="country"
                  countries={countries}
                />
                <div>
                  <input
                    placeholder="production"
                    {...register('production', {})}
                  />
                  {errors.production?.message && (
                    <Error error={errors.production?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="actors" {...register('actors', {})} />
                  {errors.actors?.message && (
                    <Error error={errors.actors?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="director" {...register('director', {})} />
                  {errors.director?.message && (
                    <Error error={errors.director?.message} />
                  )}
                </div>
                <div>
                  <input placeholder="writers" {...register('writers', {})} />
                  {errors.writers?.message && (
                    <Error error={errors.writers?.message} />
                  )}
                </div>
                {info.map((item) => (
                  <div>
                    <input
                      placeholder={item.title}
                      {...register(item.title, {})}
                    />
                    {errors[item.title]?.message && (
                      <Error error={errors[item.title]?.message} />
                    )}
                  </div>
                ))}
                <div>
                  <input
                    placeholder="boxoffice"
                    {...register('boxoffice', {})}
                  />
                  {errors.boxoffice?.message && (
                    <Error error={errors.boxoffice?.message} />
                  )}
                </div>
                <div>
                  <input type={'submit'} />
                </div>
              </form>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Dashboard
