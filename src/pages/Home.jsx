import React from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

import HeroSlide from '~/components/hero-slice/HeroSlide'
import { Link } from 'react-router-dom'
import { OutlineButton } from '~/components/button/Button'
import MovieList from '~/components/movie-list/MovieList'
import { category, movieType } from '~/common/api/tmdbApi'

const cx = classNames.bind(styles)
const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className={cx('container')}>
                <div className={`mb-3 ${cx('section')}`}>
                    <div className={`mb-2 ${cx('section-header')}`}>
                        <h2>Trending Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className="small" >View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>
            </div>
        </>
    )
}

export default Home