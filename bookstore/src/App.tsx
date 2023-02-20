import './App.scss'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'

import { fetchRefresh, fetchUserData } from './redux/userSlice'

import Routers from './routers/Routers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn)
  useEffect(() => {
    const userTokens = localStorage.getItem('user')
    if (userTokens && JSON.parse(userTokens).refresh) {
      dispatch(fetchRefresh({ refresh: JSON.parse(userTokens).refresh }))
    }
    const verifyInterval = setInterval(() => {
      if (userTokens && JSON.parse(userTokens).refresh) {
        dispatch(fetchRefresh({ refresh: JSON.parse(userTokens).refresh }))
      }
    }, 300000)

    return () => clearInterval(verifyInterval)
  }, [])

  useEffect(() => {
    const userTokens = localStorage.getItem('user')
    if (userTokens && JSON.parse(userTokens).access && isLoggedIn) {
      dispatch(fetchUserData(JSON.parse(userTokens).access))
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      <Routers />
      <ToastContainer />
    </div>
  )
}

export default App
