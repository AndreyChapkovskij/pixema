import styles from './header.module.scss'

import { useState } from 'react'

import Menu from '../Menu'
import Logo from '../UI/Logo'
import Search from '../UI/Search'
import MenuBtn from '../UI/Buttons/MenuBtn'
import Account from '../UI/Account'

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
  const [isMenu, setIsMenu] = useState(false)
  const [isDropDown, setIsDropDown] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrap}>
          <Logo />
          <Search
            search={search}
            setSearch={setSearch}
            fetchWithDebounce={fetchWithDebounce}
          />
          <Account isDropDown={isDropDown} setIsDropDown={setIsDropDown} />
          <MenuBtn setIsMenu={setIsMenu} />
          <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header
