import styles from './loader.module.scss'

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__icon}>
        <div className={styles.inner_one}></div>
        <div className={styles.inner_two}></div>
        <div className={styles.inner_three}></div>
      </div>
      <h2 className={styles.blink}>await please ...</h2>
    </div>
  )
}

export default Loader
