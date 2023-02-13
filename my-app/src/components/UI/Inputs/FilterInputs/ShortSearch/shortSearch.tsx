import styles from './shortSearch.module.scss'

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
  return (
    <div className={styles.shortSearch}>
      <span>Full or short movie name</span>
      <input placeholder={placeholder} {...register(name, {})} />
      {error && <Error error={error} />}
    </div>
  )
}

export default ShortSearch
