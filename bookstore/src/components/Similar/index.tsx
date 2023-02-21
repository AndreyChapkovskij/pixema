import styles from './similar.module.scss'

import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchSimilar } from '../../redux/productSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'

import ProductCard from '../UI/ProductCard'

const Similar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSimilar())
  }, [])

  const products = useAppSelector((state) => state.productsReducer.productItems)

  const btnNextSlider: React.LegacyRef<HTMLElement> = useRef(null)
  const btnPrevSlider: React.LegacyRef<HTMLElement> = useRef(null)

  return (
    <section className={styles.similar}>
      <div className="container">
        <div className={styles.similar__nav}>
          <h3>similar books</h3>
          <div className={styles.arrows}>
            <i ref={btnPrevSlider} className="ri-arrow-left-line"></i>
            <i ref={btnNextSlider} className="ri-arrow-right-line"></i>
          </div>
        </div>
        <div className={styles.similar__products}>
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
              515: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              630: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2.3,
                spaceBetween: 15,
              },
              990: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 3.1,
                spaceBetween: 15,
              },
            }}
          >
            {products.map((product) => {
              return (
                <SwiperSlide
                  onClick={() => {
                    navigate(`/product/${product.id}`)
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }}
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Similar
