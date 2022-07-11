import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { tmdbApi, category } from '~/common/api/tmdbApi'
import apiConfig from '~/common/api/apiConfig'

import classNames from 'classnames/bind'
import styles from './MovieList.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'


const cx = classNames.bind(styles)

const MovieList = props => {

    const [items, setItems] = useState([])

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {}

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });

                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
    }, [])
    return (
        <div className={cx('movie-list')}>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >

                {
                    items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList