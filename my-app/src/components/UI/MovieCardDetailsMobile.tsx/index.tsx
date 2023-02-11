import styles from './movieCardDetailsMobile.module.scss'

import { useAppSelector, useAppDispatch } from '../../../hooks/redux'

import { IMovieDetails } from '../../../redux/movieDetailsSlice'
import { addFavorite, delFavorite } from '../../../redux/moviesSlice'

interface IMovieCardDetailsMobileProps {
  movie: IMovieDetails
}

const MovieCardDetailsMobile: React.FC<IMovieCardDetailsMobileProps> = ({
  movie,
}) => {
  const dispatch = useAppDispatch()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  const favoriteItemsId = useAppSelector(
    (state) => state.moviesReducer.favoriteItemsId
  )

  return (
    <div
      className={
        isTheme ? styles.cardMobile + ' ' + styles.active : styles.cardMobile
      }
    >
      <div className={styles.cardMobile__image}>
        <img src={'http://localhost:5000/' + movie.img} alt={movie.title} />
      </div>

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

export default MovieCardDetailsMobile
