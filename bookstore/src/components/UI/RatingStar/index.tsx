import styles from './ratingStar.module.scss'

import { useAppSelector } from '../../../hooks/redux'

import Image from '../Image'
import StarIcon from '../icons/StarIcon'
import StarFillIcon from '../icons/StarFillIcon'
import StarHalfIcon from '../icons/StarHalfIcon'

interface IRatingStarProps {
  rating: number
}

const RatingStar: React.FC<IRatingStarProps> = ({ rating }) => {
  const productRating = []

  for (let i = 1; i <= 5; i++) {
    i <= Math.round(rating) ? productRating.push(1) : productRating.push(0)
  }

  return (
    <div className={styles.rating}>
      {productRating.map((item) => (item ? <StarFillIcon /> : <StarIcon />))}
    </div>
  )
}

export default RatingStar
