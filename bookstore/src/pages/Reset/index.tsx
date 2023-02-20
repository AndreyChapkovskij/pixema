import styles from '../Authorization/authorization.module.scss'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { changeIsSuccess } from '../../redux/resetSlice'
import { changeSuccessMessage } from '../../redux/userSlice'

import ChangePassword from '../../components/Forms/ChangePassword'
import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
      <Header />
      <section className={styles.authorization}>
        <div className="container">
          {resetToken.uid && resetToken.token ? <ChangePassword /> : <Reset />}
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Reset
