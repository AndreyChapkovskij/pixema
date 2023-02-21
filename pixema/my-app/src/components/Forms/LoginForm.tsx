import styles from './forms.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { fetchLogin } from '../../redux/userSlice'
import { IUserParams } from '../../redux/userSlice'

import Email from '../../components/UI/Inputs/FormInputs/email'
import Password from '../../components/UI/Inputs/FormInputs/password'
import Submit from '../../components/UI/Inputs/Submit'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errMessage = useAppSelector((state) => state.userReducer.errMessage)
  const successMessage = useAppSelector(
    (state) => state?.userReducer?.successMessage
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserParams>({ mode: 'onChange' })

  const onSubmit = handleSubmit(({ password, email }) => {
    dispatch(fetchLogin({ password, email: email.toLowerCase() }))
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <form
      className={isTheme ? styles.forms + ' ' + styles.active : styles.forms}
      onSubmit={onSubmit}
    >
      <h2>sign in</h2>
      {successMessage && <span className="success">{successMessage}</span>}
      {errMessage && <span className="error">{errMessage}</span>}

      <div className={styles.forms__inputs}>
        <Email register={register} error={errors.email?.message} />
        <Password
          register={register}
          name="password"
          error={errors.password?.message}
        />
      </div>
      <span className={styles.forms__link} onClick={() => navigate('/reset')}>
        forgot password?
      </span>

      <Submit isValid={isValid} value="Sign In" />
      <div className={styles.signLink}>
        <span>don’t have an account? </span>
        <span onClick={() => navigate('/registration')}>sign up</span>
      </div>
    </form>
  )
}
export default LoginForm
