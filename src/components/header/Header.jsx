import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import logo from '~/common/assets/tmovie.png'
import { Link, useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    }, {
        display: 'TV Series',
        path: '/tv'
    }
]
const Header = () => {

    const { pathname } = useLocation()
    const headerRef = useRef(null)

    const active = headerNav.findIndex(e => e.path === pathname)

    useEffect(() => {
        const shinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add(cx('shink'))
            } else {
                headerRef.current.classList.remove(cx('shink'))
            }
        }

        window.addEventListener('scroll', shinkHeader)
        return () => {
            window.removeEventListener('scroll', shinkHeader)

        }
    }, [])

    return (
        <div ref={headerRef} className={cx('header')}>
            <div className={cx('header-wrap', 'container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt='logo' />
                    <Link to='/'>tMovies</Link>
                </div>
                <ul className={cx('header-nav')}>
                    {headerNav.map((item, index) => (
                        <li key={index} className={cx(`${index === active ? 'active' : ''}`)} >
                            <Link to={item.path}>{item.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header