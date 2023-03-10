import styles from './filterInput.module.scss'

import { useAppSelector } from '../../../../hooks/redux'
import { UseFormRegister } from 'react-hook-form'

import Error from '../error'

interface IRatingProps {
  register: UseFormRegister<any>
  error: string | undefined
  placeholder: [string, string]
  name: [string, string]
}

const Rating: React.FC<IRatingProps> = ({
  register,
  name,
  placeholder,
  error,
}) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={isTheme ? styles.rating + ' ' + styles.active : styles.rating}
    >
      <label>Rating</label>
      <div className={styles.rating__input}>
        <input
          placeholder={placeholder[0]}
          {...register(name[0], {
            pattern: {
              value: /^(\d|10|\d[.,]\d)$/,
              message: 'Please enter valid rating from 0.0 to 10',
            },
          })}
        />
        <input
          placeholder={placeholder[1]}
          {...register(name[1], {
            pattern: {
              value: /^(\d|10|\d[.,]\d)$/,
              message: 'Please enter valid rating from 0.0 to 10',
            },
          })}
        />
      </div>
      {error && <Error error={error} />}
    </div>
  )
}

export default Rating
