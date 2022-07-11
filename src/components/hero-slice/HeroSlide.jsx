import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Style
import classNames from 'classnames/bind'
import styles from './HeroSlide.module.scss'
// Swiper
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Api
import apiConfig from '~/common/api/apiConfig'
import { category, movieType, tmdbApi } from '~/common/api/tmdbApi'
// Component
import Button, { OutlineButton } from '~/components/button/Button'
import Modal, { ModalContent } from '~/components/modal/Modal'


const cx = classNames.bind(styles)


const HeroSlide = () => {

    SwiperCore.use([Autoplay]);
    // Get movies
    const [movieItems, setMovieItems] = useState([])
    // Call api and save at state
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params })
                // Get 5 item in array
                setMovieItems(response.results.slice(0, 5))
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
                {/* Show all movie in state */}
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {/* get the active item */}
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                movieItems.map((item, index) => <TrailerModal key={index} item={item} />)
            }
        </div>
    )
}

const HeroSlideItem = props => {
    let navigate = useNavigate();

    const item = props.item;
    // get background image from api result
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        // get element by id
        const modal = document.querySelector(`#modal-${item.id}`);
        //get api by movie id
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        // check api and pass url into iframe
        if (videos.results.length > 0) {
            // get the first item in result api array
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal-content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal-content').innerHTML = 'No trailer';
        }
        //add or remove class active into modal
        modal.classList.toggle('active');
    }

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
                        {/* navigate to movie detail by id */}
                        <Button onClick={() => navigate(`/movie/${item.id}`, { replace: true })}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick={setModalActive} >
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                {/* Show banner of movie */}
                <div className={cx('hero-slide-item-content-poster')}>
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
            </div>
        </div >
    )
}

const TrailerModal = props => {
    const item = props.item
    const isframeRef = useRef(null)
    // remove src of iframe
    const onClose = () => isframeRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal-${item.id}`}>
            <ModalContent onClose={onClose} id={item.id}>
                <iframe ref={isframeRef} width="100%" height='500px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide
