import styles from './filterInput.module.scss'

import { useAppSelector } from '../../../../hooks/redux'
import { UseFormRegister } from 'react-hook-form'

import Error from '../error'

interface IYearProps {
  register: UseFormRegister<any>
  error: string | undefined
  placeholder: [string, string]
  name: [string, string]
}

const Year: React.FC<IYearProps> = ({ register, error, placeholder, name }) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div className={isTheme ? styles.year + ' ' + styles.active : styles.year}>
      <label>Years</label>
      <div className={styles.years__input}>
        <input
          placeholder={placeholder[0]}
          {...register(name[0], {
            pattern: {
              value: /^[12]\d{3}$/,
              message: 'Please enter valid year 2... or 1...',
            },
          })}
        />
        <input
          placeholder={placeholder[1]}
          {...register(name[1], {
            pattern: {
              value: /^[12]\d{3}$/,
              message: 'Please enter valid year 2... or 1...',
            },
          })}
        />
      </div>
      {error && <Error error={error} />}
    </div>
  )
}

export default Year
