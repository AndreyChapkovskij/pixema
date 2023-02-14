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

  const socials = [
    {
      id: 1,
      name: 'vk',
      link: 'https://vk.com',
      icon: vk,
    },
    {
      id: 2,
      name: 'instagram',
      link: 'https://instagram.com',
      icon: instagram,
    },
    {
      id: 3,
      name: 'twitter',
      link: 'https://twitter.com',
      icon: twitter,
    },
    {
      id: 4,
      name: 'facebook',
      link: 'https://facebook.com',
      icon: facebook,
    },
    {
      id: 5,
      name: 'odnoklassniki',
      link: 'https://ok.ru',
      icon: odnoklassniki,
    },
  ]

  return (
    <ul
      className={isTheme ? styles.social + ' ' + styles.active : styles.social}
    >
      {socials.map((social) => (
        <motion.li whileHover={{ scale: 1.1 }} key={social.id}>
          <Link to={social.link} target={'_blank'}>
            <img src={social.icon} alt={social.name} />
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}

export default Social
