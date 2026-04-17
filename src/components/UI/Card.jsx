import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className='', style={}, hover=true, onClick, delay=0 }) => (
  <motion.div
    initial={{opacity:0,y:14}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.28,delay}}
    whileHover={hover?{y:-2,boxShadow:'0 8px 24px rgba(27,54,93,0.12)'}:{}}
    onClick={onClick}
    className={className}
    style={{
      background:'#fff',borderRadius:'var(--radius-lg)',padding:'20px',
      boxShadow:'var(--shadow-card)',border:'1px solid var(--border-light)',
      cursor:onClick?'pointer':'default',...style
    }}
  >{children}</motion.div>
)
export default Card
