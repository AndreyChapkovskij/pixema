import styles from './forms.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { fetchLogin } from '../../redux/userSlice'
import { changeSuccessMessage } from '../../redux/userSlice'
import { IUserParams } from '../../redux/userSlice'

import Email from '../../components/UI/Inputs/FormInputs/email'
import Password from '../../components/UI/Inputs/FormInputs/password'
import Submit from '../../components/UI/Inputs/Submit'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    <form
      className={isTheme ? styles.forms + ' ' + styles.active : styles.forms}
      onSubmit={onSubmit}
    >
      <h2>sign in</h2>
      {successMessage && (
        <span className={styles.success}>{successMessage}</span>
      )}

      <Email register={register} error={errors.email?.message} />
      <Password
        register={register}
        name="password"
        error={errors.password?.message}
      />
      <span onClick={() => navigate('/reset')}>Forgot password?</span>

      <Submit isValid={isValid} value="Sign in" />
      <div className={styles.signLink}>
        <span>Don’t have an account? </span>
        <span onClick={() => navigate('/registration')}>Sign Up</span>
      </div>
    </form>
  )
}
export default LoginForm
