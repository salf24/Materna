import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import MaternLogo from '../components/UI/MaternLogo'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleLogin = async () => {
    const e = {}

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      e.email = 'Enter a valid email address'
    }

    if (!form.password) {
      e.password = 'Password is required'
    }

    setErrors(e)
    if (Object.keys(e).length) return

    try {
      setLoading(true)

      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = userCredential.user

      login({
        name: user.displayName || 'User',
        email: user.email,
      })

      navigate('/dashboard')

    } catch (err) {
      setErrors({ general: 'Invalid email or password' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel auth-panel--left">
        <div className="auth-panel-content">
          <MaternLogo height={44} variant="light" />
          <div className="auth-panel-tagline">
            <h2>Welcome<br/>Back</h2>
          </div>
          <div className="auth-panel-features">
            {[
              {icon:'favorite', text:'Daily health monitoring'},
              {icon:'psychology', text:'Personalised AI analysis'},
              {icon:'show_chart', text:'Trend tracking & history'},
            ].map(f => (
              <div key={f.icon} className="feature-item">
                <span className="material-symbols-rounded" style={{color:'var(--accent)',fontSize:20}}>
                  {f.icon}
                </span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-panel auth-panel--right">
        <motion.div
          className="auth-form-container"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.35}}
        >
          <div style={{display:'flex',justifyContent:'center',marginBottom:24}}>
            <MaternLogo height={44} variant="icon" />
          </div>

          <div className="auth-form-header" style={{textAlign:'center'}}>
            <h1>Sign In</h1>
            <p>Enter your credentials to continue</p>
          </div>

          {errors.general && (
            <div className="error-msg" style={{textAlign:'center'}}>
              {errors.general}
            </div>
          )}

          <div className="form-step" style={{marginTop:24}}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="material-symbols-rounded input-icon">mail</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span className="material-symbols-rounded input-icon">lock</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  className={errors.password ? 'error' : ''}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleLogin}
            loading={loading}
            icon="login"
            style={{marginTop:24}}
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>

          <div className="auth-redirect" style={{marginTop:20}}>
            New to Materna?{' '}
            <a href="/signup" style={{color:'var(--accent)',fontWeight:700}}>
              Create account
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login