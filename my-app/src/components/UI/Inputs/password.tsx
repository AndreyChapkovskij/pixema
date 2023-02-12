import styles from './formInput.module.scss'

import { UseFormRegister } from 'react-hook-form'

import Error from './error'

interface IPasswordProps {
  register: UseFormRegister<any>
  name: string
  error: string | undefined
  required?: boolean
  placeholder?: string
}

const Password: React.FC<IPasswordProps> = ({
  register,
  name,
  error,
  required,
  placeholder,
}) => {
  return (
    <div className={styles.formInput}>
      <label>Password</label>
      <>
        {required || required === undefined ? (
          <input
            type={'password'}
            placeholder={placeholder || 'Your password'}
            {...register(name, {
              required: 'You need to fill in this input',
              minLength: {
                value: 4,
                message: "Min length can't be less 4 symbols",
              },
            })}
          />
        ) : (
          <input
            type={'password'}
            placeholder={placeholder || 'Your password'}
            {...register(name, {
              minLength: {
                value: 4,
                message: "Min length can't be less 4 symbols",
              },
            })}
          />
        )}
      </>
      {error && <Error error={error} />}
    </div>
  )
}

export default Password
