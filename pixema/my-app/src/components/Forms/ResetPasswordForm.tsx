import styles from './forms.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchResetPassword } from '../../redux/resetSlice'

import Email from '../../components/UI/Inputs/FormInputs/email'
import Submit from '../../components/UI/Inputs/Submit'

interface IResetPasswordFormData {
  email: string
}

const ResetPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const errMessage = useAppSelector((state) => state.resetReducer.errMessage)
  const resetMessage = useAppSelector(
    (state) => state.resetReducer.resetMessage
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IResetPasswordFormData>({ mode: 'onChange' })

  const onSubmitResetPassword = handleSubmit(({ email }) => {
    dispatch(fetchResetPassword({ email: email.toLowerCase() }))
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  return (
    <form
      onSubmit={onSubmitResetPassword}
      className={isTheme ? styles.forms + ' ' + styles.active : styles.forms}
    >
      <h2>reset password</h2>
      {errMessage && <span className="error">{errMessage}</span>}
      {resetMessage ? (
        <span className="success">{resetMessage}</span>
      ) : (
        watch('email') && (
          <span className={styles.emailMessage}>
            you will receive an email {watch('email')} with a link to reset your
            password!
          </span>
        )
      )}

      <Email register={register} error={errors.email?.message} />

      <Submit isValid={isValid} value="Reset" />
    </form>
  )
}
export default ResetPasswordForm
