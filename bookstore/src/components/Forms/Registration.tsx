import styles from '../../pages/Authorization/authorization.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchRegister } from '../../redux/registrationSlice'

import Error from '../UI/Inputs/error'

interface IRegistrationInput {
  username: string
  email: string
  password: string
  confirm: string
}

interface IRegistrationProps {
  tab: number
}

const Registration: React.FC<IRegistrationProps> = ({ tab }) => {
  const dispatch = useAppDispatch()

  const errMessage = useAppSelector(
    (state) => state.registrationReducer.errMessage
  )

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<IRegistrationInput>({ mode: 'onChange' })

  const handleRegistration = handleSubmit((registrationData) => {
    const { username, email, password, confirm } = registrationData

    if (confirm === password) {
      dispatch(
        fetchRegister({
          username: username,
          email: email.toLowerCase(),
          password,
        })
      )
    } else {
      setValue('confirm', '')
      setValue('password', '')
      setError('confirm', { message: "passwords don't match" })
      setError('password', { message: "passwords don't match" })
    }
  })

  return (
    <form
      className={tab === 2 ? styles.form_registration : styles.tab}
      onSubmit={handleRegistration}
    >
      {errMessage && <span className="error">{errMessage}</span>}
      <div className={styles.form__input}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          placeholder="your name"
          {...register('username', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.username?.message && <Error error={errors.username.message} />}
      </div>
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
      <div className={styles.form__input}>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="your password"
          {...register('password', {
            required: 'You need to fill in this input',
          })}
        />
        {errors.password?.message && <Error error={errors.password.message} />}
      </div>
      <div className={styles.form__input}>
        <label htmlFor="confirm">confirm password</label>
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
        <input type="submit" value="sing up" />
      </div>
    </form>
  )
}

export default Registration
