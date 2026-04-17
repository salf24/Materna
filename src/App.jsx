import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { HealthProvider } from './context/HealthContext'
import AppLayout from './components/Navigation/AppLayout'
import Landing    from './pages/Landing'
import Login      from './pages/Login'
import Signup     from './pages/Signup'
import Dashboard  from './pages/Dashboard'
import HealthEntry from './pages/HealthEntry'
import Results    from './pages/Results'
import History    from './pages/History'
import Education  from './pages/Education'
import Profile    from './pages/Profile'

const Guard = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login"  element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route element={<Guard><AppLayout /></Guard>}>
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/health-entry" element={<HealthEntry />} />
        <Route path="/results"     element={<Results />} />
        <Route path="/history"     element={<History />} />
        <Route path="/education"   element={<Education />} />
        <Route path="/profile"     element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <HealthProvider>
        <AppRoutes />
      </HealthProvider>
    </AuthProvider>
  </BrowserRouter>
)
export default App
