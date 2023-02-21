import styles from './productCard.module.scss'

import { useAppSelector } from '../../../hooks/redux'
import { useNavigate } from 'react-router-dom'

import { IProductItem } from '../../../interface.app'

import Image from '../Image'
import StarIcon from '../icons/StarIcon'
import StarFillIcon from '../icons/StarFillIcon'
import StarHalfIcon from '../icons/StarHalfIcon'
import RatingStar from '../RatingStar'


interface IProductCardProps {
  product: IProductItem
}

export interface IProduct {
  id: number
  title: string
  author: string
  cost: string
  rating: number
  img: string
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      className={styles.product}
      onClick={() => navigate(`/product/${product.id}`)}
      key={product.id}
    >
      <div className={styles.product__img}>
        <img src={'http://localhost:3001/' + product.image} alt="" />
      </div>
      <h2>{product.title}</h2>
      <div className={styles.product__author}>
        <span>{'by ' + product.authors[0] + ', ' + product.publisher}</span>
      </div>
      <div className={styles.product__desc}>
        <span>${product.cost}</span>
        <RatingStar rating={product.rating} />
      </div>
    </div>
  )
}

export default ProductCard
