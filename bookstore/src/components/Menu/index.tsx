import styles from './menu.module.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'

import NavigateLinks from '../UI/Links/navigateLinks'
import AccountLinks from '../UI/Links/accountLinks'
import LogoutLink from '../UI/Links/logoutLink'
import Search from '../UI/Inputs/Search'
import SearchIcon from '../UI/icons/SearchIcon'

interface IMenuProps {
  isMenu: boolean
  setIsMenu: (arg: boolean) => void
  fetchWithDebounce: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Menu: React.FC<IMenuProps> = ({
  isMenu,
  setIsMenu,
  fetchWithDebounce,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)

  useEffect(() => {
    isMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '')
  }, [isMenu])

  return (
    <div className={isMenu ? styles.active + ' ' + styles.menu : styles.menu}>
      <div className={styles.menu__wrap}>
        <div className={styles.close}>
          <button
            onClick={() => {
              setIsMenu(false)
            }}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        <Search fetchWithDebounce={fetchWithDebounce} />
        {isLoggedIn ? (
          <>
            <ul className={styles.links}>
              <li>
                <Link to="/favorites">favorites</Link>
              </li>
              <li>
                <Link to="/cart">cart</Link>
              </li>
            </ul>
            <button
              className={styles.logout}
              onClick={() => dispatch(logout())}
            >
              log out
            </button>
          </>
        ) : (
          <button className={styles.sing_in} onClick={() => navigate('/login')}>
            sing in
          </button>
        )}
      </div>
    </div>
  )
}

export default Menu
