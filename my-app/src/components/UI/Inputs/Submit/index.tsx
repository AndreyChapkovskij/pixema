import styles from './submit.module.scss'

interface ISubmitProps {
  isValid: boolean
  value: string
}

const Submit: React.FC<ISubmitProps> = ({ isValid, value }) => {
  return (
    <div className={styles.submit}>
      <input type="submit" value={value} disabled={!isValid} />
    </div>
  )
}

export default Submit
