import styles from './notFound.module.scss'

import { useAppSelector } from '../../hooks/redux'

import imageEmptyDark from '../../assets/images/imageEmptyDark.png'
import imageEmptyWhite from '../../assets/images/imageEmptyWhite.png'

const NotFound: React.FC = () => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div className={styles.empty}>
      <div>
        {isTheme ? (
          <img src={imageEmptyDark} alt="" />
        ) : (
          <img src={imageEmptyWhite} alt="" />
        )}
      </div>
      <span>Not found</span>
    </div>
  )
}
export default NotFound
