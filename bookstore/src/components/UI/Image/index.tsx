import styles from './image.module.scss'

interface IImageProps {
  image: string
  title: string
  rating?: string
}

const Image: React.FC<IImageProps> = ({ image, title, rating }) => {
  return (
    <div className={styles.image}>
      {rating && (
        <div className={styles.rating}>
          <span>{rating}</span>
        </div>
      )}
      <img src={image} alt={title} />
    </div>
  )
}

export default Image
