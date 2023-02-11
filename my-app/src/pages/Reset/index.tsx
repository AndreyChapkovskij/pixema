import styles from './reset.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  fetchResetPassword,
  fetchResetConfirm,
  changeIsSuccess,
} from '../../redux/resetSlice'

import { changeSuccessMessage } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Email from '../../components/UI/Inputs/email'
import Error from '../../components/UI/Inputs/error'
import Password from '../../components/UI/Inputs/password'
import Logo from '../../components/UI/Logo'

interface IResetFormData {
  email: string
  password: string
  newPassword: string
}

const Reset: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const resetToken = useParams() // {uid:..., token:...}

  const errMessage = useAppSelector((state) => state.resetReducer.errMessage)
  const resetMessage = useAppSelector(
    (state) => state.resetReducer.resetMessage
  )
  const isSuccess = useAppSelector((state) => state.resetReducer.isSuccess)

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      dispatch(changeIsSuccess(false))
      dispatch(changeSuccessMessage('Your password has been changed'))
    }
  }, [isSuccess])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<IResetFormData>({ mode: 'onChange' })

  const onSubmitResetPassword = handleSubmit(({ email }) => {
    dispatch(fetchResetPassword({ email: email.toLowerCase() }))
  })
  const onSubmitResetConfirm = handleSubmit(({ password, newPassword }) => {
    if (newPassword === password && resetToken.uid && resetToken.token) {
      dispatch(
        fetchResetConfirm({
          uid: resetToken.uid,
          token: resetToken.token,
          new_password: password,
        })
      )
    } else if (newPassword !== password) {
      reset()
      setError('newPassword', { message: "Passwords don't match" })
      setError('password', { message: "Passwords don't match" })
    }
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={'Reset'}>
      <div
        className={isTheme ? styles.reset + ' ' + styles.active : styles.reset}
      >
        <Logo />
        {resetToken.uid && resetToken.token ? (
          <form onSubmit={onSubmitResetConfirm}>
            <h2>Reset password</h2>
            {errMessage && <span className={styles.err}>{errMessage}</span>}
            <div className={styles.password}>
              <label>Password</label>
              <Password register={register} name="password" />
              {errors.password?.message && (
                <Error error={errors.password.message} />
              )}
            </div>
            <div className={styles.confirm}>
              <label>Confirm password</label>
              <Password register={register} name="newPassword" />
              {errors.newPassword?.message && (
                <Error error={errors.newPassword.message} />
              )}
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Set password" disabled={!isValid} />
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmitResetPassword}>
            <h2>Reset password</h2>
            {resetMessage ? (
              <span className={styles.resetMessage}>{resetMessage}</span>
            ) : (
              watch('email') && (
                <span className={styles.emailMessage}>
                  You will receive an email {watch('email')} with a link to
                  reset your password!
                </span>
              )
            )}
            {errMessage && <span className={styles.err}>{errMessage}</span>}
            <div className={styles.email}>
              <label>Email</label>
              <Email register={register} />
              {errors.email?.message && <Error error={errors.email.message} />}
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Reset" disabled={!isValid} />
            </div>
          </form>
        )}
      </div>
    </Helmet>
  )
}

export default Reset
