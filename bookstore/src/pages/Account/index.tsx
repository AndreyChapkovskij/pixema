import styles from './account.module.scss'

import Helmet from '../../components/Helmet'
import ArrowBack from '../../components/UI/ArrowBack'
import Title from '../../components/UI/Title'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Account: React.FC = () => {
  return (
    <Helmet title={'Account'}>
      <Header />
      <section className={styles.account}>
        <div className="container">
          <ArrowBack />
          <Title title="account" />
          <div className={styles.profile}>
            <h2>profile</h2>
            <div>
              <div className={styles.name}>
                <label htmlFor="name">name</label>
                <input name="name" id="name" />
              </div>
              <div className={styles.email}>
                <label htmlFor="email">email</label>
                <input name="email" id="email" />
              </div>
            </div>
          </div>
          <div className={styles.password}>
            <h2>password</h2>
            <div className={styles.password__old}>
              <label htmlFor="password">password</label>
              <input name="password" id="password" />
            </div>
            <div className={styles.password__update}>
              <div className={styles.password__new}>
                <label htmlFor="password-new">new password</label>
                <input name="password-new" id="password-new" />
              </div>
              <div className={styles.password__confirm}>
                <label htmlFor="password-confirm">confirm new password</label>
                <input name="password-confirm" id="password-confirm" />
              </div>
            </div>
          </div>

          <div className={styles.btns}>
            <button className={styles.save}>save changes</button>
            <button className={styles.cancel}>cancel</button>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Account
