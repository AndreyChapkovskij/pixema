import styles from './settings.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { changeIsTheme } from '../../redux/themeSlice'

import {
  fetchSetPassword,
  fetchSetEmail,
  changeSuccessMessage,
  changeErrorMessage,
} from '../../redux/settingsSlice'
import { fetchUserData } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

import Email from '../../components/UI/Inputs/FormInputs/email'
import Password from '../../components/UI/Inputs/FormInputs/password'
import UserName from '../../components/UI/Inputs/FormInputs/userName'

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
  const successMessage = useAppSelector(
    (state) => state.settingsReducer.successMessage
  )

  useEffect(() => {
    if (errMessage || successMessage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return () => {
      successMessage && dispatch(changeSuccessMessage(''))
      errMessage && dispatch(changeErrorMessage(''))
    }
  }, [errMessage, successMessage])

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
                {errMessage && <span className="error">{errMessage}</span>}
                {successMessage && (
                  <span className="success">{successMessage}</span>
                )}
                <div className={styles.profile__data}>
                  <UserName
                    register={register}
                    error={errors.userName?.message}
                  />
                  <Email register={register} error={errors.email?.message} />
                </div>
              </div>
              <div className={styles.password}>
                <h3>Password</h3>

                <div className={styles.password__data}>
                  <Password
                    register={register}
                    name="password"
                    error={errors.password?.message}
                  />

                  <div className={styles.password__new}>
                    <Password
                      register={register}
                      name="newPassword"
                      placeholder="New password"
                      label="New password"
                      error={errors.newPassword?.message}
                      required={false}
                    />
                    <Password
                      register={register}
                      name="confirmPassword"
                      label="Confirm password"
                      placeholder="Confirm password"
                      error={errors.confirmPassword?.message}
                      required={false}
                    />
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
