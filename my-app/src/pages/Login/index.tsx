import styles from './login.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { fetchLogin } from '../../redux/userSlice'
import { changeSuccessMessage } from '../../redux/userSlice'
import { IUserParams } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Email from '../../components/UI/Inputs/email'
import Error from '../../components/UI/Inputs/error'
import Password from '../../components/UI/Inputs/password'
import Logo from '../../components/UI/Logo'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoggedIn = useAppSelector((state) => state?.userReducer?.isLoggedIn)
  const successMessage = useAppSelector(
    (state) => state?.userReducer?.successMessage
  )

  useEffect(() => {
    return function () {
      successMessage && dispatch(changeSuccessMessage(''))
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserParams>({ mode: 'onChange' })

  const onSubmit = handleSubmit(({ password, email }) => {
    dispatch(fetchLogin({ password, email: email.toLowerCase() }))
    successMessage && dispatch(changeSuccessMessage(''))
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={'Login'}>
      <div
        className={isTheme ? styles.login + ' ' + styles.active : styles.login}
      >
        <Logo />
        {isLoggedIn ? (
          <Navigate to="/home" />
        ) : (
          <form onSubmit={onSubmit}>
            <h2>sign in</h2>
            {successMessage && (
              <span className={styles.success}>{successMessage}</span>
            )}
            <div className={styles.email}>
              <label>Email</label>
              <Email register={register} />
              {errors.email?.message && <Error error={errors.email.message} />}
            </div>
            <div className={styles.password}>
              <label>Password</label>
              <Password register={register} name="password" />
              {errors.password?.message && (
                <Error error={errors.password.message} />
              )}
              <span onClick={() => navigate('/reset')}>Forgot password?</span>
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Sign in" disabled={!isValid} />
            </div>
            <div className={styles.signUp}>
              <span>Don’t have an account? </span>
              <span onClick={() => navigate('/registration')}>Sign Up</span>
            </div>
          </form>
        )}
      </div>
    </Helmet>
  )
}

export default Login
