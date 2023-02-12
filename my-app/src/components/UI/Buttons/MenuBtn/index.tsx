import styles from './menuBtn.module.scss'

interface IMenuBtnProps {
  setIsMenu: (arg: boolean) => void
}

const MenuBtn: React.FC<IMenuBtnProps> = ({ setIsMenu }) => {
  return (
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
  )
}

export default MenuBtn
