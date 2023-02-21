import styles from './icon.module.scss'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux'

const CartIcon: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems)
  const navigate = useNavigate()
  return (
    <div
      className={styles.icon + ' ' + styles.cart}
      onClick={() => navigate('/cart')}
    >
      <i className="ri-shopping-cart-line"></i>
      <span>{cartItems.length}</span>
    </div>
  )
}

export default CartIcon
