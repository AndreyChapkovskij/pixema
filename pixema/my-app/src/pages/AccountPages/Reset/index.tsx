import styles from '../accountPage.module.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { changeIsSuccess } from '../../../redux/resetSlice'
import { changeSuccessMessage } from '../../../redux/userSlice'

import Helmet from '../../../components/Helmet'
import Logo from '../../../components/UI/Logo'
import ResetPasswordForm from '../../../components/Forms/ResetPasswordForm'
import ResetPasswordFormConfirm from '../../../components/Forms/ResetPasswordFormConfirm'

const Reset: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const resetToken = useParams() // {uid:..., token:...}
  const isSuccess = useAppSelector((state) => state.resetReducer.isSuccess)

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
      dispatch(changeIsSuccess(false))
      dispatch(changeSuccessMessage('Your password has been changed'))
    }
  }, [isSuccess])

  return (
    <Helmet title={'Reset'}>
      <section className={styles.accountPage}>
        <Logo />
        {resetToken.uid && resetToken.token ? (
          <ResetPasswordFormConfirm resetToken={resetToken} />
        ) : (
          <ResetPasswordForm />
        )}
      </section>
    </Helmet>
  )
}

export default Reset
