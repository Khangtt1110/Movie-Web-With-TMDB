import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './HeroSlide.module.scss'
import { movieType, tmdbApi } from '~/common/api/tmdbApi'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import apiConfig from '~/common/api/apiConfig'
import { useNavigate } from 'react-router-dom'
import Button, { OutlineButton } from '../button/Button'

const cx = classNames.bind(styles)


const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params })
                setMovieItems(response.results)
                console.log(response);
            } catch {
                console.log('err');
            }
        }
        getMovies()
    }, [])
    return (
        <div className={cx('hero-slide')}>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 2000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const HeroSlideItem = props => {
    let navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    return (
        <div
            className={cx('hero-slide-item', `${props.className}`)}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className={cx('container', 'hero-slide-item-content')}>
                <div className={cx('hero-slide-item-content-info')}>
                    <h2 className={cx('title')}>{item.title}</h2>
                    <div className={cx('overview')}>{item.overview}</div>
                    <div className={cx('btns')}>
                        <Button onClick={() => navigate(`/movie/${item.id}`, { replace: true })}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick={() => console.log('trailer')} >
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className={cx('hero-slide-item-content-poster')}>
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
            </div>
        </div >
    )
}

const TrilerModal = props => {
    const item = props.item

    const isframeRef = useRef(null)
}

export default HeroSlide
