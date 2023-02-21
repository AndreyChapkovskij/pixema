import styles from './image.module.scss'

import { motion } from 'framer-motion'

interface IImageProps {
  image: string
  title: string
  rating?: string
}

const Image: React.FC<IImageProps> = ({ image, title, rating }) => {
  return (
    <motion.div whileHover={{ opacity: 0.7 }} className={styles.image}>
      {rating && (
        <div className={styles.rating}>
          <span>{rating}</span>
        </div>
      )}
      <img src={image} alt={title} />
    </motion.div>
  )
}

export default Image
