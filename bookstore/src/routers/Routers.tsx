import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Authorization from '../pages/Authorization'
import Reset from '../pages/Reset'
import ProtectedRoute from './ProtectedRoute'
import Catalog from '../pages/Catalog'
import ProductDetails from '../pages/ProductDetails'
import Account from '../pages/Account'
import Cart from '../pages/Cart'
import Favorites from '../pages/Favorites'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />}></Route>
      <Route path="/product/:id" element={<ProductDetails />}></Route>
      <Route path="/login" element={<Authorization />}></Route>
      <Route path="/registration" element={<Authorization />}></Route>
      <Route path="/reset/" element={<Reset />}>
        <Route path=":uid/:token" element={<Reset />} />
      </Route>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="account" element={<Account />} />
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default Routers
