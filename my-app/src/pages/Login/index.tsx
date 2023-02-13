import styles from './login.module.scss'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks/redux'

import Helmet from '../../components/Helmet'
import Logo from '../../components/UI/Logo'
import LoginForm from '../../components/Forms/LoginForm'

const Login: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state?.userReducer?.isLoggedIn)

  return (
    <Helmet title={'Login'}>
      <section className={styles.login}>
        <Logo />
        {isLoggedIn ? <Navigate to="/home" /> : <LoginForm />}
      </section>
    </Helmet>
  )
}

export default Login
