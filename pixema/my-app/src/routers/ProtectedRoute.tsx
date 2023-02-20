import React from 'react'

import { useAppSelector } from '../hooks/redux'

import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to="login" />
}

export default ProtectedRoute
