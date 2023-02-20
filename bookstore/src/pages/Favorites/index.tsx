import styles from './favorites.module.scss'

import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  fetchFavoritesProducts,
  toggleFavorites,
} from '../../redux/productSlice'

import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ArrowBack from '../../components/UI/ArrowBack'
import RatingStar from '../../components/UI/RatingStar'
import Title from '../../components/UI/Title'

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const products = useAppSelector((state) => state.productsReducer.productItems)
  const favoritesId = useAppSelector(
    (state) => state.productsReducer.favotiresId
  )

  useEffect(() => {
    favoritesId[0] && dispatch(fetchFavoritesProducts(favoritesId))
  }, [favoritesId])

  return (
    <Helmet title={'Favorites'}>
      <Header />
      <div className={styles.favorites}>
        <div className="container">
          <ArrowBack />
          <Title title="favorites" />
          {favoritesId[0] && (
            <div className={styles.favorites__list}>
              {products.map((product) => (
                <div
                  className={styles.favorites__item}
                  onClick={() => navigate(`/product/${product.id}`)}
                  key={product.id}
                >
                  <div className={styles.favorites__img}>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className={styles.favorites__info}>
                    <h3>{product.title}</h3>
                    <span>
                      by {product.authors[0] + ', ' + product.publisher}
                    </span>
                    <div className={styles.favorites__cost}>
                      <span>$63.56</span>
                      <RatingStar rating={product.rating} />
                    </div>
                  </div>
                  <div
                    className={styles.icon}
                    onClick={() => dispatch(toggleFavorites(product.id))}
                  >
                    <i className="ri-heart-fill"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Helmet>
  )
}

export default Favorites
