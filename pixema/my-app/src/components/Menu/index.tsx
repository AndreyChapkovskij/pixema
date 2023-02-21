import styles from './menu.module.scss'

import { useAppSelector } from '../../hooks/redux'

import NavigateLinks from '../UI/Links/navigateLinks'
import AccountLinks from '../UI/Links/accountLinks'
import LogoutLink from '../UI/Links/logoutLink'

import { useEffect } from 'react'

interface IMenuProps {
  isMenu: boolean
  setIsMenu: (arg: boolean) => void
}

const Menu: React.FC<IMenuProps> = ({ isMenu, setIsMenu }) => {
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  useEffect(() => {
    isMenu
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto')

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isMenu])

  return (
    <div className={isMenu ? styles.active + ' ' + styles.menu : styles.menu}>
      <div
        className={isTheme ? styles.active + ' ' + styles.wrap : styles.wrap}
      >
        <button
          onClick={() => {
            setIsMenu(false)
          }}
        >
          <i className="ri-close-line"></i>
        </button>
        <ul>
          <NavigateLinks />
        </ul>
        <ul>{isLoggedIn ? <LogoutLink /> : <AccountLinks />}</ul>
      </div>
    </div>
  )
}

export default Menu
