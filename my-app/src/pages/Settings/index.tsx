import styles from './settings.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { changeIsTheme } from '../../redux/themeSlice'

import {
  fetchSetPassword,
  fetchSetEmail,
  changeEmailMessage,
  changePasswordMessage,
} from '../../redux/settingsSlice'
import { fetchUserData } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

import Email from '../../components/UI/Inputs/email'
import Password from '../../components/UI/Inputs/password'
import UserName from '../../components/UI/Inputs/userName'
import Error from '../../components/UI/Inputs/error'
import { useEffect } from 'react'

interface ISettingsFormData {
  userName?: string
  email?: string
  password: string
  newPassword?: string
  confirmPassword?: string
}

const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userData = useAppSelector((state) => state.userReducer.userData)
  const accessToken = useAppSelector((state) => state.userReducer.accessToken)

  const errMessage = useAppSelector((state) => state.settingsReducer.errMessage)
  const passwordMessage = useAppSelector(
    (state) => state.settingsReducer.passwordMessage
  )
  const emailMessage = useAppSelector(
    (state) => state.settingsReducer.emailMessage
  )

  useEffect(() => {
    return () => {
      emailMessage && dispatch(changeEmailMessage(''))
      passwordMessage && dispatch(changePasswordMessage(''))
    }
  }, [])

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
    setValue('userName', userData.username)
  }, [userData])

  const onSubmitSave = handleSubmit((settingsData) => {
    const { userName, email, password, newPassword, confirmPassword } =
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
    navigate('/home')
  }

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={'Settings'}>
      <Header />
      <section className={isTheme ? styles.active : ''}>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <form className={styles.settings} onSubmit={onSubmitSave}>
              <div className={styles.profile}>
                <h3>Profile</h3>
                {emailMessage && (
                  <span className={styles.successMessage}>{emailMessage}</span>
                )}

                <div className={styles.profile__data}>
                  <div>
                    <label>Name</label>
                    <UserName register={register} />
                    {errors.userName?.message && (
                      <Error error={errors.userName.message} />
                    )}
                  </div>
                  <div>
                    <label>Email</label>
                    <Email register={register} />
                    {errors.email?.message && (
                      <Error error={errors.email.message} />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.password}>
                <h3>Password</h3>
                {passwordMessage && (
                  <span className={styles.successMessage}>
                    {passwordMessage}
                  </span>
                )}
                <div className={styles.password__data}>
                  <div>
                    <label>Password</label>
                    <Password register={register} name="password" />
                    {errors.password?.message && (
                      <Error error={errors.password.message} />
                    )}
                  </div>
                  <div className={styles.password__new}>
                    <div>
                      <label>New password</label>
                      <Password
                        register={register}
                        name="newPassword"
                        placeholder="New password"
                        required={false}
                      />
                      {errors.newPassword?.message && (
                        <Error error={errors.newPassword.message} />
                      )}
                    </div>
                    <div>
                      <label>Confirm password</label>
                      <Password
                        register={register}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        required={false}
                      />
                      {errors.confirmPassword?.message && (
                        <Error error={errors.confirmPassword.message} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.color}>
                <h3>Color mode</h3>
                <div className={styles.color__data}>
                  <div className={styles.color__desc}>
                    <span className={isTheme ? styles.active : ''}>Dark</span>
                    <span>Use dark theme</span>
                  </div>
                  <div
                    className={styles.color__btn}
                    onClick={() => dispatch(changeIsTheme())}
                  >
                    <div className={styles.circle}></div>
                  </div>
                </div>
              </div>
              {errMessage && (
                <span className={styles.errMessage}>{errMessage}</span>
              )}
              <div className={styles.btns}>
                <button onClick={onSubmitCancel} className={styles.cancel}>
                  Cancel
                </button>

                <button
                  disabled={!isValid}
                  type="submit"
                  className={styles.save}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Settings
