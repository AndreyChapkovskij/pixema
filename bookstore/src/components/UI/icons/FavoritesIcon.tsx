import styles from './icon.module.scss'

import { useNavigate } from 'react-router-dom'

const FavoritesIcon: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className={styles.icon + ' ' + styles.favorites}
      onClick={() => navigate('/favorites')}
    >
      <i className="ri-heart-line"></i>
    </div>
  )
}

export default FavoritesIcon
