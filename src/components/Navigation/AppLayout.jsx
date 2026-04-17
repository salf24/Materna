import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import './AppLayout.css'

const AppLayout = () => (
  <div className="app-layout">
    <Sidebar />
    <div className="app-main">
      <div className="app-content">
        <Outlet />
      </div>
    </div>
    <BottomNav />
  </div>
)
export default AppLayout
