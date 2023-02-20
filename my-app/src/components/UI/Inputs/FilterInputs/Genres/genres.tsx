import styles from './genres.module.scss'

import {
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { useAppSelector, useAppDispatch } from '../../../../../hooks/redux'
import { fetchGenres, clearGenres } from '../../../../../redux/genresSlice'

import Error from '../../error'
import { IGenres } from '../../../../../interface.app'
import { useEffect } from 'react'

interface IGenresProps {
  register: UseFormRegister<any>
  error: string | undefined
  name: string
  genreAdded: IGenres[]
  setGenreAdded: (arg: IGenres[]) => void
  setValue: UseFormSetValue<any>
  setFocus: UseFormSetFocus<any>
  watch: UseFormWatch<any>
  label?: string
}

const Genres: React.FC<IGenresProps> = ({
  register,
  name,
  error,
  genreAdded,
  setGenreAdded,
  setValue,
  setFocus,
  watch,
  label,
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (watch(name) && watch(name) === genresItems[0]?.name) {
      setGenreAdded([...genreAdded, genresItems[0]])
      setValue(name, '')
    }

    if (watch('genres')) {
      const genreValue = watch('genres') // Lose context
      dispatch(fetchGenres({ genreValue, genreAdded }))
    } else {
      dispatch(clearGenres())
    }
  }, [watch(name), genreAdded])

  const genresItems = useAppSelector((state) => state.genresReducer.genreItems)

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={isTheme ? styles.genres + ' ' + styles.active : styles.genres}
      onClick={() => setFocus(name)}
    >
      <label>{label ?? 'Sort by'}</label>
      <div className={styles.genres__types}>
        {genreAdded &&
          genreAdded?.map((genre) => (
            <div className={styles.genres__marks} key={genre.id}>
              <span>{genre.name}</span>
              <i
                className="ri-close-line"
                onClick={() => {
                  setGenreAdded(
                    genreAdded.filter((item) => item.id !== genre.id)
                  )
                }}
              ></i>
            </div>
          ))}

        <div className={styles.genres__search}>
          <input {...register(name, {})} />
          <ul className={genresItems.length ? styles.active : ''}>
            {genresItems.map((genre) => (
              <li
                onClick={() => {
                  setGenreAdded([...genreAdded, genre])
                  setValue(name, '')
                }}
                key={genre.id}
              >
                <span>{genre.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {error && <Error error={error} />}
    </div>
  )
}

export default Genres
