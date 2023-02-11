import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <span>© all rights reserved</span>
      </div>
    </footer>
  )
}
export default Footer
