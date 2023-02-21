import styles from './links.module.scss'

import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/redux'

const NavigateLinks: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  return (
    <>
      <li className={styles.link}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-home-6-fill"></i>
          <span>home</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/trends"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-fire-fill"></i>
          <span>trends</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/favoriters"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-bookmark-fill"></i>
          <span>favorites</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-settings-5-fill"></i>
          <span>settings</span>
        </NavLink>
      </li>
      {isLoggedIn && (
        <li className={styles.link}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <i className="ri-add-circle-fill"></i>
            <span>dashboard</span>
          </NavLink>
        </li>
      )}
    </>
  )
}

export default NavigateLinks
