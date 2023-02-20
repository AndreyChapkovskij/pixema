import styles from '../Authorization/authorization.module.scss'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchResetPassword } from '../../redux/resetSlice'

import Error from '../../components/UI/Inputs/error'

interface IResetInput {
  email: string
}

const Reset: React.FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const errMessage = useAppSelector((state) => state.resetReducer.errMessage)
  const resetMessage = useAppSelector(
    (state) => state.resetReducer.resetMessage
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IResetInput>({ mode: 'onChange' })

  const handleReset = handleSubmit(({ email }) => {
    dispatch(fetchResetPassword({ email: email.toLowerCase() }))
  })
  return (
    <form className={styles.forms} onSubmit={handleReset}>
      <h2>reset password</h2>
      {resetMessage ? (
        <span className={styles.success}>{resetMessage}</span>
      ) : (
        watch('email') && (
          <span className={styles.emailMessage}>
            you will receive an email {watch('email')} with a link to reset your
            password!
          </span>
        )
      )}

      {errMessage && <span className={styles.err}>{errMessage}</span>}
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
      <div className={styles.submit}>
        {resetMessage ? (
          <input onClick={() => navigate('/')} value="go to home" />
        ) : (
          <input type="submit" value="reset" />
        )}
      </div>
    </form>
  )
}

export default Reset
