import React from 'react'
import { NavLink } from 'react-router-dom'

function Link({ text, className, to, icon }) {
    return (
        <NavLink className={className} to={to}>
            {icon && icon}  {text}
        </NavLink>
    )
}

export default Link