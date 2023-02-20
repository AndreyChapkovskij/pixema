import { useNavigate } from 'react-router-dom'
import styles from './icon.module.scss'

const AccountIcon: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div
      className={styles.icon + ' ' + styles.account}
      onClick={() => navigate('/account')}
    >
      <i className="ri-account-circle-line"></i>
    </div>
  )
}

export default AccountIcon
