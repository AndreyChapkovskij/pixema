import styles from './header.module.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { setIsFilter } from '../../redux/filterSlice'

import Menu from '../Menu'
import AccountLinks from '../UI/Links/accountLinks'
import LogoutLink from '../UI/Links/accountLinks'

interface IHeaderProps {
  fetchWithDebounce?: (e: React.ChangeEvent<HTMLInputElement>) => void
  search?: string
}
const Header: React.FC<IHeaderProps> = ({ fetchWithDebounce, search }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isMenu, setIsMenu] = useState(false)
  const [isDropDown, setIsDropDown] = useState(false)

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const userData = useAppSelector((state) => state.userReducer.userData)

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
          <div className={styles.search}>
            <input
              type="text"
              onChange={(e) => {
                fetchWithDebounce && fetchWithDebounce(e)
              }}
            />

            {search ? (
              <div className={styles.search__icon}>
                <i className="ri-search-line"></i>
              </div>
            ) : (
              <div
                className={styles.search__icon}
                onClick={() => {
                  dispatch(setIsFilter(true))
                  window.scrollTo(0, 0)
                }}
              >
                <i className="ri-menu-3-line"></i>
              </div>
            )}
          </div>
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
                  <span>An</span>
                </div>
                <span>Anonimus</span>
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
