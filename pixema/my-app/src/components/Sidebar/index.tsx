import styles from './sidebar.module.scss'

import NavigateLinks from '../UI/Links/navigateLinks'

const Sidebar: React.FC = () => {
  return (
    <ul className={styles.sidebar}>
      <NavigateLinks />
    </ul>
  )
}

export default Sidebar
