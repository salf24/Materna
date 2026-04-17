import React from 'react'
import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const NAV = [
  { to:'/dashboard',   icon:'space_dashboard', label:'Home' },
  { to:'/health-entry',icon:'vital_signs',      label:'Track' },
  { to:'/history',     icon:'history',           label:'History' },
  { to:'/education',   icon:'menu_book',         label:'Learn' },
  { to:'/profile',     icon:'account_circle',    label:'Profile' },
]

const BottomNav = () => (
  <nav className="bottom-nav">
    {NAV.map(item => (
      <NavLink key={item.to} to={item.to}
        className={({isActive}) => `bottom-nav-item${isActive?' active':''}`}
      >
        <span className="material-symbols-rounded" style={{fontSize:23}}>{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
)
export default BottomNav
