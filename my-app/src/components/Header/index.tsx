import styles from './header.module.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useDebounce from '../../hooks/useDebounce'

import { changeSearch, fetchSearch } from '../../redux/searchSlice'

import Menu from '../Menu'
import AccountLinks from '../UI/Links/accountLinks'
import LogoutLink from '../UI/Links/logoutLink'
import Search from '../UI/Search'

interface IHeaderProps {
  currentPage?: number
  setCurrentPage?: (arg: number) => void
}
const Header: React.FC<IHeaderProps> = ({ setCurrentPage, currentPage }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isMenu, setIsMenu] = useState(false)
  const [isDropDown, setIsDropDown] = useState(false)

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const userData = useAppSelector((state) => state.userReducer.userData)

  const fetchWithDebounce = useDebounce((e) => {
    e.target.value && dispatch(fetchSearch(e.target.value))
    if (!e.target.value) {
      currentPage && currentPage !== 1 && setCurrentPage && setCurrentPage(1)
      dispatch(changeSearch(''))
    }
  }, 1000)

  return (
    <header
      className={isTheme ? styles.header + ' ' + styles.active : styles.header}
    >
      <div className="container">
        <div className={styles.header__wrap}>
          <div className={styles.logo} onClick={() => navigate('/home')}>
            <span>pix</span>
            <span>ema</span>
          </div>
          <Search fetchWithDebounce={fetchWithDebounce} />
          <div
            className={styles.account}
            onClick={() => setIsDropDown(!isDropDown)}
          >
            {isLoggedIn && userData ? (
              <div className={styles.name}>
                <div className={styles.image}>
                  <span>{userData?.username?.slice(0, 2)}</span>
                </div>
                <span>{userData.username}</span>
              </div>
            ) : (
              <div className={styles.name}>
                <div className={styles.image}>
                  <span>an</span>
                </div>
                <span>anonimus</span>
              </div>
            )}
            <div className={styles.icon}>
              {isDropDown ? (
                <i className="ri-arrow-up-s-line"></i>
              ) : (
                <i className="ri-arrow-down-s-line"></i>
              )}
            </div>
            <ul
              className={
                isDropDown
                  ? styles.dropdown + ' ' + styles.active
                  : styles.dropdown
              }
            >
              {isLoggedIn ? <LogoutLink /> : <AccountLinks />}
            </ul>
          </div>
          <div
            className={styles.menu__btn}
            onClick={() => {
              setIsMenu(true)
              window.scrollTo(0, 0)
            }}
          >
            <button>
              <i className="ri-menu-line"></i>
            </button>
          </div>
          <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header
