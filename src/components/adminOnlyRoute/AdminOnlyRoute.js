import React from 'react'
import { useSelector } from 'react-redux'
import { selectedEmail } from '../../redux/slice/authSlice'
import { NavLink } from 'react-router-dom'

export const AdminOnlyRoute = ({ children }) => {
    const userEmail = useSelector(selectedEmail)

    if (userEmail === 'mocalovaulia83@gmail.com') {
        return children
    }
    return (
        <section style={{ height: '80vh' }}>
            <div className='container'>
                <h2>Permission Denied.</h2>
                <p>This page can only by view by an Admin user.</p>
                <br />
                <NavLink to='/'>
                    <button className='--btn'>&larr; Back To Home</button>
                </NavLink>
            </div>
        </section>
    )
}

export const AdminOnlyLink = ({ children }) => {
    const userEmail = useSelector(selectedEmail)

    if (userEmail === 'mocalovaulia83@gmail.com') {
        return children
    }
    return null
}
