import styles from './modal.module.scss'

import { useAppSelector } from '../../hooks/redux'

interface IPopupProps {
  children: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLAllCollection>,
    HTMLAllCollection
  >
  isModal: boolean
  setIsModal: (arg: boolean) => void
  title: string
}

const Popup: React.FC<IPopupProps> = ({
  children,
  isModal,
  setIsModal,
  title,
}) => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={isModal ? styles.active + ' ' + styles.modal : styles.modal}
    >
      <div
        className={isTheme ? styles.active + ' ' + styles.wrap : styles.wrap}
      >
        <div className={styles.title}>
          <h2>{title}</h2>
          <button
            onClick={() => {
              setIsModal(false)
            }}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        <>{children}</>
      </div>
    </div>
  )
}

export default Popup
