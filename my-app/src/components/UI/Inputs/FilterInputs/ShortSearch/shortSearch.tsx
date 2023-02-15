import styles from './shortSearch.module.scss'

import { useAppSelector } from '../../../../../hooks/redux'
import { UseFormRegister } from 'react-hook-form'

import Error from '../../error'

interface IYearProps {
  register: UseFormRegister<any>
  error: string | undefined
  placeholder: string
  name: string
}

const ShortSearch: React.FC<IYearProps> = ({
  register,
  error,
  placeholder,
  name,
}) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={
        isTheme ? styles.shortSearch + ' ' + styles.active : styles.shortSearch
      }
    >
      <label>Full or short movie name</label>
      <input placeholder={placeholder} {...register(name, {})} />
      {error && <Error error={error} />}
    </div>
  )
}

export default ShortSearch
