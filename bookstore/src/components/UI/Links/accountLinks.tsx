import styles from './links.module.scss'

import { Link } from 'react-router-dom'

const AccountLinks: React.FC = () => {
  return (
    <>
      <li className={styles.accountLink + ' ' + styles.link}>
        <Link to="/registration">
          <i className="ri-user-add-fill"></i>
          <span>Sign Up</span>
        </Link>
      </li>
      <li className={styles.accountLink + ' ' + styles.link}>
        <Link to="/login">
          <i className="ri-login-circle-fill"></i>
          <span>Sign In</span>
        </Link>
      </li>
    </>
  )
}

export default AccountLinks
