import React from 'react'
import { motion } from 'framer-motion'

const Button = ({
  children, onClick, variant = 'primary', size = 'md', icon,
  disabled = false, fullWidth = false, loading = false,
  type = 'button', style = {}
}) => {
  const variants = {
    primary:   { bg:'var(--accent)',   color:'#fff',                 border:'none',                      shadow:'0 2px 10px rgba(230,126,150,0.35)' },
    secondary: { bg:'#fff',            color:'var(--primary)',        border:'1.5px solid var(--border)', shadow:'none' },
    danger:    { bg:'var(--plum)',     color:'#fff',                 border:'none',                      shadow:'0 2px 8px rgba(112,47,64,0.25)' },
    outline:   { bg:'transparent',    color:'var(--accent)',         border:'1.5px solid var(--accent)', shadow:'none' },
    ghost:     { bg:'transparent',    color:'var(--text-secondary)', border:'none',                      shadow:'none' },
    dark:      { bg:'var(--primary)', color:'#fff',                 border:'none',                      shadow:'0 2px 10px rgba(27,54,93,0.3)' },
  }
  const sizes = {
    sm:{ padding:'8px 14px',  fontSize:'0.82rem', height:36, iconSize:16 },
    md:{ padding:'11px 22px', fontSize:'0.9rem',  height:44, iconSize:18 },
    lg:{ padding:'14px 28px', fontSize:'1rem',    height:52, iconSize:20 },
  }
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md
  return (
    <motion.button
      type={type} onClick={onClick} disabled={disabled||loading}
      whileHover={{scale:disabled?1:1.02,y:disabled?0:-1}}
      whileTap={{scale:disabled?1:0.97}}
      style={{
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,
        background:v.bg,color:v.color,border:v.border,
        borderRadius:'var(--radius-md)',padding:s.padding,
        fontSize:s.fontSize,fontWeight:600,fontFamily:'var(--font-body)',
        height:s.height,width:fullWidth?'100%':'auto',
        cursor:disabled?'not-allowed':'pointer',
        opacity:disabled?0.55:1,boxShadow:v.shadow,
        transition:'background 0.18s',...style
      }}
    >
      {loading
        ? <span className="material-symbols-rounded" style={{fontSize:s.iconSize,animation:'spin 0.8s linear infinite'}}>progress_activity</span>
        : icon ? <span className="material-symbols-rounded" style={{fontSize:s.iconSize}}>{icon}</span> : null
      }
      {children}
    </motion.button>
  )
}
export default Button
