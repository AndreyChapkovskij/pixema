import styles from './logo.module.scss'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/redux'

interface ILogoProps {
  customClassName?: string
}

const Logo: React.FC<ILogoProps> = ({ customClassName }) => {
  const navigate = useNavigate()
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={styles.logo + ' ' + customClassName}
      onClick={() => navigate('/home')}
    >
      <span>pix</span>
      <span className={isTheme ? styles.active : ''}>ema</span>
    </div>
  )
}

export default Logo
