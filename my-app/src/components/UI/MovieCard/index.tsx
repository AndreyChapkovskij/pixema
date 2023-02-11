import styles from './movieCard.module.scss'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux'

import { IMovieItem } from '../../../redux/moviesSlice'

import Genres from '../../UI/Genres'
import Image from '../Image'

interface IMovieCardProps {
  movie: IMovieItem
}

const MovieCard: React.FC<IMovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  return (
    <div
      className={styles.movie}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <Image
        image={'http://localhost:5000/' + movie.img}
        title={movie.title}
        rating={movie.rating}
      />
      <h3
        className={isTheme ? styles.title + ' ' + styles.active : styles.title}
      >
        {movie.title}
      </h3>
      <Genres genres={movie.genres} />
    </div>
  )
}

export default MovieCard
