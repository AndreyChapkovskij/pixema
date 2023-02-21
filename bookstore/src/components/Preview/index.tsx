import styles from './preview.module.scss'

interface PreviewProps {
  image: string
  title: string
  setIsPreview: (arg: boolean) => void
}

const Preview: React.FC<PreviewProps> = ({ image, title, setIsPreview }) => {
  return (
    <div className={styles.preview}>
      <div className={styles.wrap}>
        <div className={styles.close} onClick={() => setIsPreview(false)}>
          <i className="ri-close-line"></i>
        </div>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  )
}
export default Preview
