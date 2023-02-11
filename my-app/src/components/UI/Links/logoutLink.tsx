import styles from './links.module.scss'

import { useAppDispatch } from '../../../hooks/redux'

import { logout } from '../../../redux/userSlice'

const LogoutLink: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <li className={styles.link} onClick={() => dispatch(logout())}>
      <i className="ri-logout-circle-fill"></i>
      <span>Logout</span>
    </li>
  )
}

export default LogoutLink
