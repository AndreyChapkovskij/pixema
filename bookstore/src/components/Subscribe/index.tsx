import styles from './subscribe.module.scss'

const Subscribe: React.FC = () => {
  return (
    <section className={styles.subscribe}>
      <div className="container">
        <div className={styles.wrap}>
          <h2>subscribe to newsletter</h2>
          <span>
            be the first to know about new IT books, upcoming releases,
            exclusive offers and more.
          </span>
          <div className={styles.subscribe__input}>
            <input type="text" placeholder="Your email" />
            <button>subscribe</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
