import styles from './loader.module.scss'

import { useAppSelector } from '../../../../hooks/redux'

const Loader: React.FC = () => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  return (
    <div className={styles.loader}>
      <div className={styles.loader__icon}>
        <div className={styles.inner_one}></div>
        <div className={styles.inner_two}></div>
        <div className={styles.inner_three}></div>
      </div>
      <h2
        className={isTheme ? styles.blink + ' ' + styles.active : styles.blink}
      >
        await please ...
      </h2>
    </div>
  )
}

export default Loader
