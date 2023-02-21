import styles from './underfind.module.scss'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import Footer from '../../components/Footer'

const Underfind: React.FC = () => {
  return (
    <Helmet title={'Trends'}>
      <Header />
      <section>
        <div className="container">
          <div className="wrap">
            <Sidebar />
            <div className={styles.underfind}>
              <h2>404 this page not found</h2>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Underfind
