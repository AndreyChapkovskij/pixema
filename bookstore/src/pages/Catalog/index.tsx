import styles from './catalog.module.scss'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchProducts } from '../../redux/productSlice'

import Subscribe from '../../components/Subscribe'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Helmet from '../../components/Helmet'
import ProductList from '../../components/ProductList'
import Pagination from '../../components/Pagination'
import Title from '../../components/UI/Title'

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const products = useAppSelector((state) => state.productsReducer.productItems)
  const search = useAppSelector((state) => state.productsReducer.search)
  const totalCount = useAppSelector((state) => state.productsReducer.totalCount)

  useEffect(() => {
    dispatch(fetchProducts({ currentPage, search }))
  }, [currentPage, search])

  useEffect(() => {
    totalCount && setTotalPages(Math.ceil(Number(totalCount) / products.length))
  }, [totalCount])

  return (
    <Helmet title={'Catalog'}>
      <Header />
      <section className={styles.product_list}>
        <div className="container">
          <Title title="new releases books" />
          <div className={styles.product__wrap}>
            <ProductList products={products} />
          </div>
        </div>
      </section>
      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Subscribe />
      <Footer />
    </Helmet>
  )
}

export default Catalog
