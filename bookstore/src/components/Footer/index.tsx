import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrap}>
          <span>©2022 Bookstore</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
