import styles from './forms.module.scss'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from 'react-hook-form'

import { fetchActivate } from '../../redux/registrationSlice'

import Token from '../../components/UI/Inputs/token'
import Submit from '../../components/UI/Inputs/Submit'

interface ITokenFormData {
  token: string
}

const TokenForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const errMessage = useAppSelector(
    (state) => state.registrationReducer.errMessage
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ITokenFormData>({ mode: 'onChange' })

  const onSubmitToken = handleSubmit(({ token }) => {
    const authToken = token.split('/')
    dispatch(fetchActivate({ uid: authToken[0], token: authToken[1] }))
  })

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <form
      onSubmit={onSubmitToken}
      className={isTheme ? styles.forms + ' ' + styles.active : ''}
    >
      <h2>sign up</h2>
      {errMessage && <span className={styles.err}>{errMessage}</span>}
      <Token register={register} error={errors.token?.message} />
      <Submit isValid={isValid} value={'Access'} />
    </form>
  )
}
export default TokenForm
