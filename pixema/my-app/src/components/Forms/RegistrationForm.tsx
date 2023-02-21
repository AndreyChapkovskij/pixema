import styles from './forms.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { fetchRegister } from '../../redux/registrationSlice'

import Email from '../../components/UI/Inputs/FormInputs/email'
import Password from '../../components/UI/Inputs/FormInputs/password'
import UserName from '../UI/Inputs/FormInputs/userName'
import Submit from '../../components/UI/Inputs/Submit'

interface IRegistrationFormData {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errMessage = useAppSelector(
    (state) => state.registrationReducer.errMessage
  )

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<IRegistrationFormData>({ mode: 'onChange' })

  const onSubmitRegistration = handleSubmit((registrationData) => {
    const { userName, email, password, confirmPassword } = registrationData

    if (confirmPassword === password) {
      dispatch(
        fetchRegister({
          username: userName,
          email: email.toLowerCase(),
          password,
        })
      )
    } else {
      setValue('confirmPassword', '')
      setValue('password', '')
      setError('confirmPassword', { message: "passwords don't match" })
      setError('password', { message: "passwords don't match" })
    }
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <form
      className={isTheme ? styles.forms + ' ' + styles.active : styles.forms}
      onSubmit={onSubmitRegistration}
    >
      <h2>sign up</h2>

      {errMessage && <span className="error">{errMessage}</span>}

      <div className={styles.forms__inputs}>
        <UserName register={register} error={errors.userName?.message} />
        <Email register={register} error={errors.email?.message} />
        <Password
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <Password
          register={register}
          name="confirmPassword"
          label="confirm password"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message}
        />
      </div>

      <Submit isValid={isValid} value={'Sign Up'} />
      <div className={styles.signLink}>
        <span>already have an account?</span>
        <span onClick={() => navigate('/login')}>sign in</span>
      </div>
    </form>
  )
}
export default RegistrationForm
