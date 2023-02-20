import styles from './arrowBack.module.scss'
import { useNavigate } from 'react-router-dom'

const ArrowBack: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.arrow} onClick={() => navigate(-1)}>
      <i className="ri-arrow-left-line"></i>
    </div>
  )
}

export default ArrowBack
