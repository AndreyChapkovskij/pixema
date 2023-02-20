import styles from './recommendations.module.scss'

import { useRef } from 'react'

import { useNavigate } from 'react-router-dom/dist'
import { useAppSelector } from '../../hooks/redux'

import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'

import Image from '../../components/UI/Image'
import Genres from '../../components/UI/Genres'

import { IMovieItem } from '../../interface.app'

interface IRecommendedProps {
  moviesRecommend: IMovieItem[]
}

const Recommendations: React.FC<IRecommendedProps> = ({ moviesRecommend }) => {
  const navigate = useNavigate()
  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)

  const btnNextSlider: React.LegacyRef<HTMLElement> = useRef(null)
  const btnPrevSlider: React.LegacyRef<HTMLElement> = useRef(null)

  return (
    <div
      className={
        isTheme
          ? styles.recommendations + ' ' + styles.active
          : styles.recommendations
      }
    >
      <div className={styles.recommendations__nav}>
        <h3>Recommendations</h3>
        <div className={styles.arrows}>
          <i ref={btnPrevSlider} className="ri-arrow-left-line"></i>
          <i ref={btnNextSlider} className="ri-arrow-right-line"></i>
        </div>
      </div>
      <div className={styles.recommendations__movies}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: btnPrevSlider.current,
            nextEl: btnNextSlider.current,
          }}
          onInit={(swiper) => {
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            506: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            622: {
              slidesPerView: 2.3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            990: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 2.1,
              spaceBetween: 15,
            },
            1820: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          {moviesRecommend.map((movie) => {
            return (
              <SwiperSlide>
                <div
                  key={movie.id}
                  className={styles.movie}
                  onClick={() => {
                    navigate(`/movie/${movie.id}`)
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }}
                >
                  <Image
                    image={'http://localhost:5000/' + movie.img}
                    title={movie.title}
                    rating={movie.rating}
                  />
                  <h3 className={styles.title}>{movie.title}</h3>
                  <Genres genres={movie.genres} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default Recommendations
