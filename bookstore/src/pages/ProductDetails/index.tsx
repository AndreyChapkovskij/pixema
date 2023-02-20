import styles from './productDetails.module.scss'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchProductById } from '../../redux/productDetailsSlice'

import { addCartItems } from '../../redux/cartSlice'
import { toggleFavorites } from '../../redux/productSlice'

import { toast } from 'react-toastify'

import Helmet from '../../components/Helmet'
import Header from '../../components/Header'
import Subscribe from '../../components/Subscribe'
import Similar from '../../components/Similar'
import Preview from '../../components/Preview'
import ArrowBack from '../../components/UI/ArrowBack'
import RatingStar from '../../components/UI/RatingStar'
import MoreIcon from '../../components/UI/icons/MoreIcon'
import FacebookIcon from '../../components/UI/icons/FacebookIcon'
import TwitterIcon from '../../components/UI/icons/TwitterIcon'

function ProductDetails() {
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    id && dispatch(fetchProductById(id))
  }, [id])

  const product = useAppSelector(
    (state) => state.productDetailsReducer?.productItem
  )
  const favotiresId = useAppSelector(
    (state) => state.productsReducer?.favotiresId
  )
  const cartItems = useAppSelector((state) => state.cartReducer?.cartItems)

  const [infoCount, setInfoCount] = useState(2)
  const [isPreview, setIsPreview] = useState(false)
  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (isPreview) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isPreview])

  return (
    <Helmet title={'ProductDetails'}>
      <Header />
      <section className={styles.product}>
        <div className="container">
          <ArrowBack />
          {product ? (
            <>
              <h1>{product.title}</h1>
              <div className={styles.product__info}>
                <div className={styles.product__image}>
                  <img
                    src={'http://localhost:3001/' + product.image}
                    alt={product.title}
                  ></img>
                  <div
                    className={
                      favotiresId.includes(product.id)
                        ? styles.product__fav_icon + ' ' + styles.active
                        : styles.product__fav_icon
                    }
                    onClick={() => dispatch(toggleFavorites(product.id))}
                  >
                    <i
                      className={
                        favotiresId.includes(product.id)
                          ? 'ri-heart-fill'
                          : 'ri-heart-line'
                      }
                    ></i>
                  </div>
                </div>
                <div className={styles.product__artibutes}>
                  <div className={styles.product__cost}>
                    <span>${product.cost}</span>
                    <RatingStar rating={product.rating} />
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <th>authors</th>
                        <td>
                          {product.authors[1]
                            ? product.authors[0] + ', ' + product.authors[1]
                            : product.authors[0]}
                        </td>
                      </tr>
                      <tr>
                        <th>publisher</th>
                        <td>{product.publisher}</td>
                      </tr>
                      {product.info.map(
                        (item, i) =>
                          i < infoCount && (
                            <tr>
                              <th>{item.title}</th>
                              <td>{item.description}</td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                  <div
                    className={styles.show_more}
                    onClick={() => {
                      infoCount === 2
                        ? setInfoCount(product.info.length)
                        : setInfoCount(2)
                    }}
                  >
                    <span>More details</span>
                    {infoCount === 2 ? (
                      <i className="ri-arrow-down-s-line"></i>
                    ) : (
                      <i className="ri-arrow-up-s-line"></i>
                    )}
                  </div>
                  {cartItems.find((item) => item.id === product.id) ? (
                    <button className={styles.add + ' ' + styles.active}>
                      already added
                    </button>
                  ) : (
                    <button
                      className={styles.add}
                      onClick={() => {
                        dispatch(addCartItems(product))
                        toast.success(`Product added successfully`)
                      }}
                    >
                      add to cart
                    </button>
                  )}

                  <button
                    className={styles.preview}
                    onClick={() => setIsPreview(true)}
                  >
                    preview book
                  </button>
                  {isPreview && (
                    <Preview
                      title={product.title}
                      image={'http://localhost:3001/' + product.image}
                      setIsPreview={setIsPreview}
                    />
                  )}
                </div>
              </div>
              <div className={styles.product__tabs}>
                <ul className={styles.tabs__title}>
                  <li
                    onClick={() => setTab(1)}
                    className={tab === 1 ? styles.active : ''}
                  >
                    description
                  </li>
                  <li
                    onClick={() => setTab(2)}
                    className={tab === 2 ? styles.active : ''}
                  >
                    authors
                  </li>
                  <li
                    onClick={() => setTab(3)}
                    className={tab === 3 ? styles.active : ''}
                  >
                    reviews
                  </li>
                </ul>
                <div
                  className={tab === 1 ? styles.tabs__description : styles.tab}
                >
                  <p>{product.description}</p>
                </div>
                <div className={tab === 2 ? styles.tabs__authors : styles.tab}>
                  <span>
                    {product.authors.map((author, i) =>
                      i + 1 === product.authors.length
                        ? author + '.'
                        : author + ', '
                    )}
                  </span>
                </div>
                <div className={tab === 3 ? styles.tabs__reviews : styles.tab}>
                  {product.reviews.map((review) => (
                    <div className={styles.review} key={review.id}>
                      <h3>{review.name}</h3>
                      <div className={styles.text}>
                        <p>{review.text}</p>
                      </div>
                      <RatingStar rating={review.mark} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.icons}>
                <FacebookIcon />
                <TwitterIcon />
                <MoreIcon />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </section>
      <Subscribe />
      <Similar />
    </Helmet>
  )
}

export default ProductDetails
