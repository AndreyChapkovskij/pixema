import styles from './sortBy.module.scss'

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import Error from '../../error'

interface ISortBYProps {
  register: UseFormRegister<any>
  error?: string | undefined
  name: string
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
}

const SortBY: React.FC<ISortBYProps> = ({
  register,
  name,
  error,
  setValue,
  watch,
}) => {
  return (
    <div className={styles.sort}>
      <span>Sort by</span>
      <div className={styles.sort__types}>
        <div
          className={watch(name) === 'rating' ? styles.active : ''}
          onClick={() => {
            setValue(name, 'rating')
          }}
        >
          <span>Rating</span>
          <input type="radio" {...register(name, {})} value="rating" />
        </div>
        <div
          className={watch(name) === 'year' ? styles.active : ''}
          onClick={() => {
            setValue(name, 'year')
          }}
        >
          <span>Year</span>
          <input type="radio" {...register(name, {})} value="year" />
        </div>
      </div>
      {error && <Error error={error} />}
    </div>
  )
}

export default SortBY
