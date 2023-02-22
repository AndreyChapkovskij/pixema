import styles from './underfind.module.scss'

import { useAppSelector } from '../../hooks/redux'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Underfind: React.FC = () => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <Helmet title={'Trends'}>
      <Header />
      <section>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <div className={styles.underfind}>
              <h2 className={isTheme ? styles.active : ''}>
                404 this page not found
              </h2>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Underfind
