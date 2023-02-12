import styles from './formInput.module.scss'

import { UseFormRegister } from 'react-hook-form'

import Error from './error'

interface IUserNameProps {
  register: UseFormRegister<any>
  error: string | undefined
  value?: string
}

const UserName: React.FC<IUserNameProps> = ({ register, value, error }) => {
  return (
    <div className={styles.formInput}>
      <label>Name</label>
      <input
        placeholder="Your name"
        {...register('userName', {
          value: value,
          required: 'You need to fill in this input',
          minLength: {
            value: 4,
            message: "Min length can't be less 4 symbols",
          },
          maxLength: {
            value: 30,
            message: "Max length can't be more 30 symbols",
          },
        })}
      />
      {error && <Error error={error} />}
    </div>
  )
}

export default UserName
