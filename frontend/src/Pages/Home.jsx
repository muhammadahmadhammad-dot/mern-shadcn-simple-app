import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import { toast } from 'react-toastify'

export const Home = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    if(window.localStorage.getItem('token') || false){
      window.localStorage.removeItem('token')
    }
    if(window.localStorage.getItem('auth') || false){
      window.localStorage.removeItem('auth')
    }
    toast.success("Logout Successfully");
  }
  return (
    <div>Home
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}
