import styles from './formInput.module.scss'

import { UseFormRegister } from 'react-hook-form'

import Error from './error'

interface IEmailProps {
  register: UseFormRegister<any>
  error: string | undefined
  value?: string
}

const Email: React.FC<IEmailProps> = ({ register, value, error }) => {
  return (
    <div className={styles.formInput}>
      <label>Email</label>
      <input
        placeholder="Your email"
        {...register('email', {
          value: value,
          required: 'You need to fill in this input',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            message: 'Please enter valid email',
          },
        })}
      />
      {error && <Error error={error} />}
    </div>
  )
}

export default Email
