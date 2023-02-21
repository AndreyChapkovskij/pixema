import styles from './authorization.module.scss'

import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Navigate, useLocation } from 'react-router-dom'

import Login from '../../components/Forms/Login'
import Registration from '../../components/Forms/Registration'
import Helmet from '../../components/Helmet'
import Token from '../../components/Forms/Token'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Authorization: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    location.pathname === '/registration' && setTab(2)
  }, [])

  const [tab, setTab] = useState(1)

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const isToken = useAppSelector((state) => state.registrationReducer.isToken)

  return (
    <Helmet title={location.pathname}>
      <Header />
      <section className={styles.authorization}>
        <div className="container">
          <div className={styles.forms}>
            <div className={styles.form__tabs}>
              <div
                className={
                  tab === 1 ? styles.sign + ' ' + styles.active : styles.sign
                }
                onClick={() => setTab(1)}
              >
                <span>sign in</span>
              </div>
              <div
                className={
                  tab === 2 ? styles.sign + ' ' + styles.active : styles.sign
                }
                onClick={() => setTab(2)}
              >
                <span>sign up</span>
              </div>
            </div>
            {isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <>
                <Login tab={tab} />
                {isToken ? (
                  <Token tab={tab} setTab={setTab} />
                ) : (
                  <Registration tab={tab} />
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Authorization
