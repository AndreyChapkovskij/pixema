import styles from './productList.module.scss'

import { useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'

import { IProductItem } from '../../interface.app'

import ProductCard from '../UI/ProductCard'


interface IProductListProps {
  products: IProductItem[]
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  )
}

export default ProductList
