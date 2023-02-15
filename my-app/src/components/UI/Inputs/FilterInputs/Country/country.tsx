import styles from './country.module.scss'

import { Control, Controller } from 'react-hook-form'

import { useAppSelector } from '../../../../../hooks/redux'

import { ICountry } from '../../../../../redux/countrySlice'

import Error from '../../error'
import ReactSelect from 'react-select'

interface ICountryProps {
  name: string
  countries: ICountry[]
  control: Control<any>
}

const Country: React.FC<ICountryProps> = ({ name, countries, control }) => {
  const getValue = (value: string) =>
    value ? countries.find((country) => country.name === value) : []

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={
        isTheme ? styles.country + ' ' + styles.active : styles.country
      }
    >
      <label>Country</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <ReactSelect
              className={styles.country__select}
              // isClearable
              placeholder="Select country"
              value={getValue(value)}
              options={countries}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(newValue) => onChange((newValue as ICountry).name)}
            ></ReactSelect>
            {error?.message && <Error error={error.message} />}
          </>
        )}
      ></Controller>
    </div>
  )
}

export default Country
