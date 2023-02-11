import styles from './logo.module.scss'

import { useNavigate } from 'react-router-dom'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.logo} onClick={() => navigate('/home')}>
      <span>pix</span>
      <span>ema</span>
    </div>
  )
}

export default Logo
