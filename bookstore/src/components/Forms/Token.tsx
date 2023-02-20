import styles from '../../pages/Authorization/authorization.module.scss'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchActivate } from '../../redux/registrationSlice'

import { changeIsSuccess } from '../../redux/registrationSlice'
import { changeSuccessMessage } from '../../redux/userSlice'

import Error from '../UI/Inputs/error'

interface ITokenInput {
  token: string
}

interface ITokenProps {
  tab: number
  setTab: (arg: number) => void
}
const Token: React.FC<ITokenProps> = ({ tab, setTab }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errMessage = useAppSelector(
    (state) => state.registrationReducer.errMessage
  )
  const isSuccess = useAppSelector(
    (state) => state.registrationReducer.isSuccess
  )

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      setTab(1)
      dispatch(changeIsSuccess(false))
      dispatch(changeSuccessMessage('You has been registered'))
    }
  }, [isSuccess])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ITokenInput>({ mode: 'onChange' })

  const handleToken = handleSubmit(({ token }) => {
    const authToken = token.split('/')
    dispatch(fetchActivate({ uid: authToken[0], token: authToken[1] }))
  })

  return (
    <form
      onSubmit={handleToken}
      className={tab === 2 ? styles.form_registration : styles.tab}
    >
      <h2>confirm token</h2>
      {errMessage && <span className="error">{errMessage}</span>}
      <div className={styles.form__input}>
        <label htmlFor="token">your token</label>
        <input
          id="token"
          placeholder="Your token"
          {...register('token', {
            required: 'you need to fill in this input',
          })}
        />
        {errors.token?.message && <Error error={errors.token.message} />}
      </div>
      <div className={styles.submit}>
        <input type="submit" value="send token" />
      </div>
    </form>
  )
}

export default Token
