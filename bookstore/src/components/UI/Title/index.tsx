import styles from './title.module.scss'

interface ITitleProps {
  title: string
}

const Title: React.FC<ITitleProps> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>
}

export default Title
