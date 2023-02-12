import styles from './logo.module.scss'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/redux'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div className={styles.logo} onClick={() => navigate('/home')}>
      <span>pix</span>
      <span className={isTheme ? styles.active : ''}>ema</span>
    </div>
  )
}

export default Logo
