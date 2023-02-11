import styles from './registration.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  fetchRegister,
  fetchActivate,
  changeIsSuccess,
} from '../../redux/registrationSlice'
import { changeSuccessMessage } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Email from '../../components/UI/Inputs/email'
import Error from '../../components/UI/Inputs/error'
import Password from '../../components/UI/Inputs/password'
import UserName from '../../components/UI/Inputs/userName'
import Token from '../../components/UI/Inputs/token'
import Logo from '../../components/UI/Logo'

interface IRegistrationFormData {
  token: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const Registration: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isToken = useAppSelector((state) => state.registrationReducer.isToken)
  const isSuccess = useAppSelector(
    (state) => state.registrationReducer.isSuccess
  )

  const errMessage = useAppSelector(
    (state) => state.registrationReducer.errMessage
  )

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<IRegistrationFormData>({ mode: 'onChange' })

  const onSubmitRegistration = handleSubmit((registrationData) => {
    const { userName, email, password, confirmPassword } = registrationData

    if (confirmPassword === password) {
      dispatch(
        fetchRegister({
          username: userName,
          email: email.toLowerCase(),
          password,
        })
      )
    } else {
      setValue('confirmPassword', '')
      setValue('password', '')
      setError('confirmPassword', { message: "Passwords don't match" })
      setError('password', { message: "Passwords don't match" })
    }
  })

  const onSubmitToken = handleSubmit(({ token }) => {
    const authToken = token.split('/')
    dispatch(fetchActivate({ uid: authToken[0], token: authToken[1] }))
  })

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      dispatch(changeIsSuccess(false))
      dispatch(changeSuccessMessage('You has been registered'))
    }
  }, [isSuccess])

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={'Registration'}>
      <div
        className={
          isTheme ? styles.register + ' ' + styles.active : styles.register
        }
      >
        <Logo />
        {isToken ? (
          <form onSubmit={onSubmitToken}>
            <h2>sign up</h2>
            {errMessage && <span className={styles.err}>{errMessage}</span>}
            <div className={styles.token}>
              <label>Access your token</label>
              <Token register={register} />
              {errors.token?.message && <Error error={errors.token.message} />}
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Access" disabled={!isValid} />
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmitRegistration}>
            <h2>sign up</h2>
            {errMessage && <span className={styles.err}>{errMessage}</span>}
            <div className={styles.name}>
              <label>Name</label>
              <UserName register={register} />
              {errors.userName?.message && (
                <Error error={errors.userName.message} />
              )}
            </div>
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
            </div>
            <div className={styles.confirm}>
              <label>Confirm password</label>
              <Password
                register={register}
                name="confirmPassword"
                placeholder="Confirm password"
              />
              {errors.confirmPassword?.message && (
                <Error error={errors.confirmPassword.message} />
              )}
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Sign Up" disabled={!isValid} />
            </div>
            <div className={styles.signIn}>
              <span>Already have an account?</span>
              <span onClick={() => navigate('/login')}>Sign In</span>
            </div>
          </form>
        )}
      </div>
    </Helmet>
  )
}

export default Registration
