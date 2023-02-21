import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import Favoriters from '../pages/Favoriters'
import Home from '../pages/Home'
import Login from '../pages/AccountPages/Login'
import Registration from '../pages/AccountPages/Registration'
import Reset from '../pages/AccountPages/Reset'
import MovieDetails from '../pages/MovieDetails'
import Settings from '../pages/Settings'
import Trends from '../pages/Trends'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Underfind from '../pages/404'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/movie/:id" element={<MovieDetails />}></Route>
      <Route path="/favoriters" element={<Favoriters />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/reset/" element={<Reset />}>
        <Route path=":uid/:token" element={<Reset />} />
      </Route>
      <Route path="/trends" element={<Trends />}></Route>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="settings" element={<Settings />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Underfind />} />
    </Routes>
  )
}

export default Routers
