import styles from './account.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  changeSuccessMessage,
  fetchSetEmail,
  fetchSetPassword,
} from '../../redux/accountSlice'
import { fetchUserData } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import ArrowBack from '../../components/UI/ArrowBack'
import Title from '../../components/UI/Title'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Error from '../../components/UI/Inputs/error'

interface ISettingsFormData {
  username?: string
  email?: string
  password: string
  newPassword?: string
  confirmPassword?: string
}

const Account: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userData = useAppSelector((state) => state.userReducer.userData)
  const accessToken = useAppSelector((state) => state.userReducer.accessToken)

  const errMessage = useAppSelector((state) => state.accountReducer.errMessage)
  const successMessage = useAppSelector(
    (state) => state.accountReducer.successMessage
  )

  useEffect(() => {
    if (errMessage || successMessage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return () => {
      successMessage && dispatch(changeSuccessMessage(''))
    }
  }, [successMessage, errMessage])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<ISettingsFormData>({ mode: 'onChange' })

  useEffect(() => {
    setValue('email', userData.email)
    setValue('username', userData.username)
  }, [userData])

  const onSubmitSave = handleSubmit((settingsData) => {
    const { username, email, password, newPassword, confirmPassword } =
      settingsData
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        dispatch(
          fetchSetPassword({
            new_password: newPassword,
            current_password: password,
            accessToken,
          })
        )
        reset()
      } else {
        reset()
        setError('confirmPassword', { message: "Passwords don't match" })
        setError('newPassword', { message: "Passwords don't match" })
      }
    }
    if (email !== userData.email && email) {
      dispatch(
        fetchSetEmail({
          current_password: password,
          new_email: email,
          accessToken,
        })
      )
      dispatch(fetchUserData(accessToken))
      reset()
    }
  })

  const onSubmitCancel = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Helmet title={'Account'}>
      <Header />
      <section className={styles.account}>
        <div className="container">
          <ArrowBack />
          <Title title="account" />

          <form onSubmit={onSubmitSave}>
            <div className={styles.profile}>
              <h2>profile</h2>
              {successMessage && (
                <span className="success">{successMessage}</span>
              )}
              {errMessage && <span className="error">{errMessage}</span>}
              <div>
                <div className={styles.name}>
                  <label htmlFor="name">name</label>
                  <input id="name" {...register('username', {})} />
                  {errors.username?.message && (
                    <Error error={errors.username.message} />
                  )}
                </div>
                <div className={styles.email}>
                  <label htmlFor="email">email</label>
                  <input id="email" {...register('email', {})} />
                  {errors.email?.message && (
                    <Error error={errors.email.message} />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.password}>
              <h2>password</h2>
              <div className={styles.password__old}>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'You need to fill in this input',
                  })}
                />
                {errors.password?.message && (
                  <Error error={errors.password.message} />
                )}
              </div>
              <div className={styles.password__update}>
                <div className={styles.password__new}>
                  <label htmlFor="password-new">new password</label>
                  <input
                    type="password"
                    id="password-new"
                    {...register('newPassword', {})}
                  />
                  {errors.newPassword?.message && (
                    <Error error={errors.newPassword.message} />
                  )}
                </div>
                <div className={styles.password__confirm}>
                  <label htmlFor="password-confirm">confirm new password</label>
                  <input
                    type="password"
                    id="password-confirm"
                    {...register('confirmPassword', {})}
                  />
                  {errors.confirmPassword?.message && (
                    <Error error={errors.confirmPassword.message} />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.btns}>
              <button className={styles.save} type="submit">
                save changes
              </button>
              <button className={styles.cancel} onClick={onSubmitCancel}>
                cancel
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Account
