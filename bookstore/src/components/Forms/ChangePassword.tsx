import styles from '../../pages/Authorization/authorization.module.scss'

import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchResetConfirm } from '../../redux/resetSlice'

import Error from '../../components/UI/Inputs/error'

interface IResetInput {
  password: string
  confirm: string
}

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const resetToken = useParams()

  const errMessage = useAppSelector((state) => state.resetReducer.errMessage)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<IResetInput>({ mode: 'onChange' })

  const handleResetConfirm = handleSubmit(({ password, confirm }) => {
    if (confirm === password && resetToken.uid && resetToken.token) {
      dispatch(
        fetchResetConfirm({
          uid: resetToken.uid,
          token: resetToken.token,
          new_password: password,
        })
      )
    } else if (confirm !== password) {
      reset()
      setError('confirm', { message: "Passwords don't match" })
      setError('password', { message: "Passwords don't match" })
    }
  })

  return (
    <form className={styles.forms} onSubmit={handleResetConfirm}>
      <h2>new password</h2>
      {errMessage && <span className={styles.err}>{errMessage}</span>}
      <div className={styles.form__input}>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          {...register('password', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.password?.message && <Error error={errors.password.message} />}
      </div>
      <div className={styles.form__input}>
        <label htmlFor="confirm">Confirm password</label>
        <input
          type="password"
          id="confirm"
          placeholder="confirm your password"
          {...register('confirm', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.confirm?.message && <Error error={errors.confirm.message} />}
      </div>

      <div className={styles.submit}>
        <input type="submit" value="set password" />
      </div>
    </form>
  )
}

export default ChangePassword
