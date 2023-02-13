import styles from './forms.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchResetConfirm } from '../../redux/resetSlice'

import { Params } from 'react-router-dom'

import Password from '../../components/UI/Inputs/FormInputs/password'
import Submit from '../../components/UI/Inputs/Submit'

interface ResetPasswordFormConfirmData {
  password: string
  newPassword: string
}
interface IResetTokenProps {
  resetToken: Readonly<Params<string>>
}

const ResetPasswordFormConfirm: React.FC<IResetTokenProps> = ({
  resetToken,
}) => {
  const dispatch = useAppDispatch()

  const errMessage = useAppSelector((state) => state.resetReducer.errMessage)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormConfirmData>({ mode: 'onChange' })

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
    <form
      onSubmit={onSubmitResetConfirm}
      className={isTheme ? styles.forms + ' ' + styles.active : styles.forms}
    >
      <h2>Reset password</h2>
      {errMessage && <span className={styles.err}>{errMessage}</span>}
      <Password
        register={register}
        name="password"
        error={errors.password?.message}
      />
      <Password
        register={register}
        name="newPassword"
        error={errors.newPassword?.message}
      />

      <Submit isValid={isValid} value="Set password" />
    </form>
  )
}
export default ResetPasswordFormConfirm
