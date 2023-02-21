import './App.scss'

import Routers from './routers/Routers'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/redux'

import { fetchRefresh, fetchUserData } from './redux/userSlice'

import { changeIsTheme } from './redux/themeSlice'
import { changeSearch } from './redux/searchSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const isTheme = useAppSelector((state) => state.themeReducer.isTheme)
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

  useEffect(() => {
    const currentTheme = localStorage.getItem('isTheme')
    if (currentTheme && JSON.parse(currentTheme) !== isTheme) {
      dispatch(changeIsTheme())
    }
  }, [])

  useEffect(() => {
    if (
      !(location.pathname.includes('/movie/') || location.pathname === '/home')
    ) {
      dispatch(changeSearch(''))
    }
  }, [location.pathname])

  return (
    <div className={isTheme ? 'App active' : 'App'}>
      <Routers />
    </div>
  )
}

export default App
