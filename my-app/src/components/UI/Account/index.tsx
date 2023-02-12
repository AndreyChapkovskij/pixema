import styles from './account.module.scss'

import { useAppSelector } from '../../../hooks/redux'

import AccountLinks from '../Links/accountLinks'
import LogoutLink from '../Links/logoutLink'

interface IMenuProps {
  isDropDown: boolean
  setIsDropDown: (arg: boolean) => void
}

const Account: React.FC<IMenuProps> = ({ isDropDown, setIsDropDown }) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  const userData = useAppSelector((state) => state.userReducer.userData)

  return (
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
          isDropDown ? styles.dropdown + ' ' + styles.active : styles.dropdown
        }
      >
        {isLoggedIn ? <LogoutLink /> : <AccountLinks />}
      </ul>
    </div>
  )
}

export default Account
