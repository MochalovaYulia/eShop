import React from 'react'
import { useSelector } from 'react-redux'
import { selectedIsLoggedIn } from '../../redux/slice/authSlice'

export const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectedIsLoggedIn)

    if(isLoggedIn) {
        return children
    }
    return null
  
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectedIsLoggedIn)

    if(!isLoggedIn) {
        return children
    }
    return null
  
}
