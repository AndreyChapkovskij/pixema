import styles from './genres.module.scss'

import { IGenres } from '../../../interface.app'

interface IGenresProps {
  genres: IGenres[]
}

const Genres: React.FC<IGenresProps> = ({ genres }) => {
  return (
    <ul className={styles.genres}>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  )
}

export default Genres
