import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'
import classNames from 'classnames/bind'


const cx = classNames.bind(styles)

const Button = props => {
    return (
        <button className={cx('btn', `${props.className}`)} onClick={props.onClick ? () => props.onClick() : null}>
            {props.children}
        </button >
    )
}

export const OutlineButton = props => {
    return (
        <Button className={cx('btn-outline', `${props.className}`)} onClick={props.onClick ? () => props.onClick() : null}>
            {props.children}
        </Button>

    )
}

Button.propTypes = {
    onclick: PropTypes.func
}

export default Button
