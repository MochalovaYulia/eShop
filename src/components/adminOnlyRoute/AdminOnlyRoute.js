import React from 'react'
import { useSelector } from 'react-redux'
import { selectedEmail } from '../../redux/slice/authSlice'

export const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectedEmail)

    if(userEmail === 'mocalovaulia83@gmail.com') {
        return children
    }
    return null
}
