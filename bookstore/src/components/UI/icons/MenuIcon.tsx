import styles from './icon.module.scss'

interface IMenuIconProps {
  setIsMenu: (arg: boolean) => void
}

const MenuIcon: React.FC<IMenuIconProps> = ({ setIsMenu }) => {
  return (
    <div
      className={styles.icon + ' ' + styles.mobile_menu}
      onClick={() => {
        setIsMenu(true)
        window.scrollTo(0, 0)
      }}
    >
      <i className="ri-menu-line"></i>
    </div>
  )
}

export default MenuIcon
