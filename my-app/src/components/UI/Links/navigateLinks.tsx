import styles from './links.module.scss'

import { NavLink } from 'react-router-dom'

const NavigateLinks: React.FC = () => {
  return (
    <>
      <li className={styles.link}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-home-6-fill"></i>
          <span>Home</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/trends"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-fire-fill"></i>
          <span>Trends</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/favoriters"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-bookmark-fill"></i>
          <span>Favorites</span>
        </NavLink>
      </li>
      <li className={styles.link}>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <i className="ri-settings-5-fill"></i>
          <span>Settings</span>
        </NavLink>
      </li>
    </>
  )
}

export default NavigateLinks
