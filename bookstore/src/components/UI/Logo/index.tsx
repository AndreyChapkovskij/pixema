import styles from './logo.module.scss'

import { useNavigate } from 'react-router-dom'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.logo} onClick={() => navigate('/')}>
      <span>bookstore</span>
    </div>
  )
}

export default Logo
