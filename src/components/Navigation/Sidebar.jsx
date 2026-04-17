import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MaternLogo from '../UI/MaternLogo'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

const NAV = [
  { to:'/dashboard',   icon:'space_dashboard', label:'Dashboard' },
  { to:'/health-entry',icon:'vital_signs',      label:'Health Entry' },
  { to:'/history',     icon:'history',           label:'History' },
  { to:'/education',   icon:'menu_book',         label:'Education' },
  { to:'/profile',     icon:'account_circle',    label:'Profile' },
]

const Sidebar = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      className="sidebar"
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div className="sidebar-logo">
        <MaternLogo variant="icon" height={34} />
        <AnimatePresence>
          {!collapsed && (
            <motion.div className="sidebar-logo-text"
              initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}
              transition={{duration:0.15}}
            >
              <div className="sidebar-brand">Materna</div>
              <div className="sidebar-tagline">Maternal Health</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({isActive}) => `sidebar-item${isActive?' active':''}`}
          >
            <span className="material-symbols-rounded sidebar-icon">{item.icon}</span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span className="sidebar-label"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  transition={{duration:0.12}}
                >{item.label}</motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            <span className="material-symbols-rounded" style={{fontSize:18,color:'#fff'}}>person</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div className="user-info"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              >
                <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
                <span className="user-week">Week {user?.week || 30}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="sidebar-logout" onClick={() => { logout(); navigate('/login') }}>
          <span className="material-symbols-rounded" style={{fontSize:19}}>logout</span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <span className="material-symbols-rounded"
          style={{fontSize:16,transition:'transform 0.25s',transform:collapsed?'rotate(180deg)':'none'}}
        >chevron_left</span>
      </button>
    </motion.aside>
  )
}
export default Sidebar
