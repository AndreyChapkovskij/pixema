import styles from './registration.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'

import { changeIsSuccess } from '../../redux/registrationSlice'
import { changeSuccessMessage } from '../../redux/userSlice'

import Helmet from '../../components/Helmet'
import Logo from '../../components/UI/Logo'
import RegistrationForm from '../../components/Forms/RegistrationForm'
import TokenForm from '../../components/Forms/TokenForm'

const Registration: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isToken = useAppSelector((state) => state.registrationReducer.isToken)

  const isSuccess = useAppSelector(
    (state) => state.registrationReducer.isSuccess
  )

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      dispatch(changeIsSuccess(false))
      dispatch(changeSuccessMessage('You has been registered'))
    }
  }, [isSuccess])

  return (
    <Helmet title={'Registration'}>
      <section className={styles.registration}>
        <Logo />
        {isToken ? <TokenForm /> : <RegistrationForm />}
      </section>
    </Helmet>
  )
}

export default Registration
