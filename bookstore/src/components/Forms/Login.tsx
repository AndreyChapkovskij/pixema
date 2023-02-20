import styles from '../../pages/Authorization/authorization.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { fetchLogin } from '../../redux/userSlice'
import { changeSuccessMessage } from '../../redux/userSlice'

import Error from '../UI/Inputs/error'

interface ILoginInput {
  email: string
  password: string
}

interface ILoginProps {
  tab: number
}

const Login: React.FC<ILoginProps> = ({ tab }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const successMessage = useAppSelector(
    (state) => state.userReducer.successMessage
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginInput>({ mode: 'onChange' })

  const handleLogin = handleSubmit(({ password, email }) => {
    console.log(1)
    dispatch(fetchLogin({ password, email: email.toLowerCase() }))
    successMessage && dispatch(changeSuccessMessage(''))
  })

  return (
    <form
      className={tab === 1 ? styles.form_login : styles.tab}
      onSubmit={handleLogin}
    >
      {successMessage && <span className="success">{successMessage}</span>}
      <div className={styles.form__input}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          placeholder="your email"
          {...register('email', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.email?.message && <Error error={errors.email.message} />}
      </div>
      <div className={styles.form__input}>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="your password"
          {...register('password', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.password?.message && <Error error={errors.password.message} />}
        <span onClick={() => navigate('/reset')}> forgot your password?</span>
      </div>
      <div className={styles.submit}>
        <input type="submit" value="sing in" />
      </div>
    </form>
  )
}

export default Login
