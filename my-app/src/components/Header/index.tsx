import styles from './header.module.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { setIsFilter } from '../../redux/filterSlice'

import Menu from '../Menu'
import LogoutLink from '../UI/Links/logoutLink'
import AccountLinks from '../UI/Links/accountLinks'

interface IHeaderProps {
  fetchWithDebounce?: (e: React.ChangeEvent<HTMLInputElement>) => void
  search?: string
  setSearch?: (arg: string) => void
}
const Header: React.FC<IHeaderProps> = ({
  fetchWithDebounce,
  search,
  setSearch,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isMenu, setIsMenu] = useState(false)
  const [isDropDown, setIsDropDown] = useState(false)

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const userData = useAppSelector((state) => state.userReducer.userData)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrap}>
          <div className={styles.logo} onClick={() => navigate('/home')}>
            <span>pix</span>
            <span className={isTheme ? styles.active : ''}>ema</span>
          </div>
          <div
            className={
              isTheme ? styles.search + ' ' + styles.active : styles.search
            }
          >
            <input
              type="text"
              disabled={!fetchWithDebounce}
              value={search}
              onChange={(e) => {
                fetchWithDebounce && fetchWithDebounce(e)
                setSearch && setSearch(e.target.value)
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
                  // document.body.style.overflow = 'hidden'
                  window.scrollTo(0, 0)
                }}
              >
                <i className="ri-menu-3-line"></i>
              </div>
            )}
          </div>
          <div
            className={styles.menu__btn}
            onClick={() => {
              setIsMenu(true)
              // document.body.style.overflow = 'hidden'
              window.scrollTo(0, 0)
            }}
          >
            <button>
              <i className="ri-menu-line"></i>
            </button>
          </div>
          <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
          <div
            className={
              isTheme ? styles.active + ' ' + styles.account : styles.account
            }
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
        </div>
      </div>
    </header>
  )
}

export default Header
