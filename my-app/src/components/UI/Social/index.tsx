import styles from './social.module.scss'

import { motion } from 'framer-motion'

import vk from '../../../assets/images/vk.svg'
import instagram from '../../../assets/images/instagram.svg'
import twitter from '../../../assets/images/twitter.svg'
import facebook from '../../../assets/images/facebook.svg'
import odnoklassniki from '../../../assets/images/odnoklassniki.svg'

import { useAppSelector } from '../../../hooks/redux'
import { Link } from 'react-router-dom'

const Social: React.FC = () => {
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <ul
      className={isTheme ? styles.social + ' ' + styles.active : styles.social}
    >
      <motion.li whileHover={{ scale: 1.1 }}>
        <Link to={'https://vk.com'} target={'_blank'}>
          <img src={vk} alt="vk" />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <Link to={'https://instagram.com'} target={'_blank'}>
          <img src={instagram} alt="instagram" />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <Link to={'https://twitter.com'} target={'_blank'}>
          <img src={twitter} alt="twitter" />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <Link to={'https://facebook.com'} target={'_blank'}>
          <img src={facebook} alt="facebook" />
        </Link>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <Link to={'https://ok.ru'} target={'_blank'}>
          <img src={odnoklassniki} alt="odnoklassniki" />
        </Link>
      </motion.li>
    </ul>
  )
}

export default Social
