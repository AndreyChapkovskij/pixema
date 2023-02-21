import styles from './header.module.scss'

import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import useDebounce from '../../hooks/useDebounce'

import { fetchProductsSearch, changeSearch } from '../../redux/productSlice'

import Logo from '../UI/Logo'
import Search from '../UI/Inputs/Search'
import CartIcon from '../UI/icons/CartIcon'
import AccountIcon from '../UI/icons/AccountIcon'
import FavoritesIcon from '../UI/icons/FavoritesIcon'
import Menu from '../Menu'
import MenuIcon from '../UI/icons/MenuIcon'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isMenu, setIsMenu] = useState(false)

  const fetchWithDebounce = useDebounce((e) => {
    if (e.target.value) {
      dispatch(fetchProductsSearch({ currentPage: 1, search: e.target.value }))
    }
    !e.target.value && dispatch(changeSearch(''))
  }, 1000)

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.header__wrap}>
            <Logo />
            <Search fetchWithDebounce={fetchWithDebounce} />
            <div className={styles.icons}>
              <FavoritesIcon />
              <CartIcon />
              <AccountIcon />
              <MenuIcon setIsMenu={setIsMenu} />
            </div>
          </div>
        </div>
      </header>
      <Menu
        isMenu={isMenu}
        setIsMenu={setIsMenu}
        fetchWithDebounce={fetchWithDebounce}
      />
    </>
  )
}

export default Header
