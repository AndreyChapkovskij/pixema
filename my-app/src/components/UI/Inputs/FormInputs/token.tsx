import styles from './formInput.module.scss'

import { UseFormRegister } from 'react-hook-form'

import Error from '../error'

interface ITokenProps {
  register: UseFormRegister<any>
  error: string | undefined
}

const Token: React.FC<ITokenProps> = ({ register, error }) => {
  return (
    <div className={styles.formInput}>
      <label>Access your token</label>
      <input
        placeholder="Your token"
        {...register('token', {
          required: 'You need to fill in this input',
          value: '',
          pattern: {
            value: /^[A-Z0-9._%+-]+\/[A-Z0-9._%+-]+$/i,
            message: 'Please enter valid token',
          },
        })}
      />
      {error && <Error error={error} />}
    </div>
  )
}

export default Token
