import styles from './movieCardDetails.module.scss'

import { useAppSelector, useAppDispatch } from '../../../hooks/redux'

import { IMovieDetails } from '../../../redux/movieDetailsSlice'
import { addFavorite, delFavorite } from '../../../redux/moviesSlice'

import Image from '../Image'

interface IMovieCardDetailsProps {
  movie: IMovieDetails
}

const MovieCardDetails: React.FC<IMovieCardDetailsProps> = ({ movie }) => {
  const dispatch = useAppDispatch()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  const favoriteItemsId = useAppSelector(
    (state) => state.moviesReducer.favoriteItemsId
  )

  return (
    <div
      className={
        isTheme ? styles.movie__card + ' ' + styles.active : styles.movie__card
      }
    >
      <Image image={'http://localhost:5000/' + movie.img} title={movie.title} />

      <div className={styles.btns}>
        {favoriteItemsId.find((itemId) => itemId === Number(movie.id)) ? (
          <div
            className={styles.bookmark + ' ' + styles.added}
            onClick={() => dispatch(delFavorite(movie.id))}
          >
            <i className="ri-bookmark-fill"></i>
          </div>
        ) : (
          <div
            className={styles.bookmark}
            onClick={() => dispatch(addFavorite(movie.id))}
          >
            <i className="ri-bookmark-fill"></i>
          </div>
        )}

        <div className={styles.share}>
          <i className="ri-share-line"></i>
        </div>
      </div>
    </div>
  )
}

export default MovieCardDetails
