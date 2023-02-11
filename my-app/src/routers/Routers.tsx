import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import Favoriters from '../pages/Favoriters'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Reset from '../pages/Reset'
import MovieDetails from '../pages/MovieDetails'
import Settings from '../pages/Settings'
import Trends from '../pages/Trends'
import ProtectedRoute from './ProtectedRoute'

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
      </Route>
    </Routes>
  )
}

export default Routers
