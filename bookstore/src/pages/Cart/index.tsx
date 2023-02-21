import styles from './cart.module.scss'

import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'

import { toast } from 'react-toastify'

import {
  addCartItems,
  ICartProduct,
  delCartCountOne,
  delCartItem,
} from '../../redux/cartSlice'

import Helmet from '../../components/Helmet'
import ArrowBack from '../../components/UI/ArrowBack'
import Title from '../../components/UI/Title'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cartProducts = useAppSelector((state) => state.cartReducer.cartItems)

  const total = {
    getSumAll: (cartProducts: ICartProduct[]): number => {
      const sum = cartProducts.reduce((prev, next) => {
        return prev + Number(next.cost) * next.count
      }, 0)
      return Number(sum.toFixed(2))
    },
    getSumOne: (cartProduct: ICartProduct): number =>
      Number((Number(cartProduct.cost) * cartProduct.count).toFixed(2)),
    getVat: (sum: number): number => Number(((sum * 20) / 100).toFixed(2)),
  }

  return (
    <Helmet title={'Cart'}>
      <Header />
      <section className={styles.cart}>
        <div className="container">
          <ArrowBack />
          <Title title="your cart" />

          <div className={styles.cart__list}>
            {cartProducts.map((product) => (
              <div className={styles.cart__item} key={product.id}>
                <div
                  className={styles.cart__img}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={styles.cart__info}>
                  <h3>{product.title}</h3>
                  <span>{product.authors[0] + ', ' + product.publisher}</span>
                  <div className={styles.cart__count}>
                    <div
                      className={styles.cart__add}
                      onClick={() => dispatch(addCartItems(product))}
                    >
                      <i className="ri-add-fill"></i>
                    </div>
                    <span>{product.count}</span>
                    <div
                      className={styles.cart__minus}
                      onClick={() => dispatch(delCartCountOne(product.id))}
                    >
                      <i className="ri-subtract-fill"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.cart__cost}>
                  ${total.getSumOne(product)}
                </div>
                <div
                  className={styles.cart__del}
                  onClick={() => {
                    dispatch(delCartItem(product.id))
                    toast.success('Product have been deleted')
                  }}
                >
                  <i className="ri-close-line"></i>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cart__total}>
            <div>
              <div className={styles.total__info}>
                <table>
                  <tbody>
                    <tr>
                      <th>sum total</th>
                      <td>${total.getSumAll(cartProducts)}</td>
                    </tr>
                    <tr>
                      <th>VAT</th>
                      <td>${total.getVat(total.getSumAll(cartProducts))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.total__cost}>
                <span>total</span>
                <span>
                  $
                  {Number(
                    (
                      total.getVat(total.getSumAll(cartProducts)) +
                      total.getSumAll(cartProducts)
                    ).toFixed(2)
                  )}
                </span>
              </div>
              <button>check out</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Cart
