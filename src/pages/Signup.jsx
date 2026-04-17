import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MaternLogo from '../components/UI/MaternLogo'
import Button from '../components/UI/Button'
import { useAuth } from '../context/AuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../services/firebase'
import './Auth.css'

const STEPS = ['Account', 'Health Profile', 'Conditions']

const Signup = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    deliveryDate: '',
    week: 30,
    conditions: ['Hypertension'],
    otherConditions: ''
  })
  const [errors, setErrors] = useState({})

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Full name is required'
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address'
      if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    }
    if (step === 1) {
      if (!form.deliveryDate) e.deliveryDate = 'Expected delivery date is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validate()) setStep(s => s + 1)
  }

  const back = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      setLoading(true)

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      await updateProfile(userCredential.user, {
        displayName: form.name
      })

      login({
        name: form.name,
        email: form.email,
        deliveryDate: form.deliveryDate,
        week: form.week,
        conditions: form.conditions
      })

      navigate('/dashboard')

    } catch (err) {
      let message = 'Signup failed'

      if (err.code === 'auth/email-already-in-use') {
        message = 'Email already in use'
      } else if (err.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters'
      }

      setErrors({ general: message })
    } finally {
      setLoading(false)
    }
  }

  const sv = {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel auth-panel--left">
        <div className="auth-panel-content">
          <MaternLogo height={44} variant="light" />
          <div className="auth-panel-tagline">
            <h2>Your Pregnancy<br/>Health Companion</h2>
          </div>
          <div className="auth-panel-features">
            {[
              { icon: 'psychology', text: 'AI-driven risk analysis' },
              { icon: 'show_chart', text: 'Health trend tracking' },
              { icon: 'notifications', text: 'Smart health alerts' }
            ].map(f => (
              <div key={f.icon} className="feature-item">
                <span className="material-symbols-rounded" style={{ color: 'var(--accent)', fontSize: 20 }}>
                  {f.icon}
                </span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-panel auth-panel--right">
        <div className="auth-form-container">

          <div className="auth-form-header">
            <h1>Create Account</h1>
            <p>Step {step + 1} of {STEPS.length} — <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{STEPS[step]}</span></p>
          </div>

          <div className="step-dots">
            {STEPS.map((_, i) => (
              <div key={i} className={`step-dot${i <= step ? ' active' : ''}`} />
            ))}
          </div>

          {errors.general && (
            <div className="error-msg">{errors.general}</div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={sv}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >

              {step === 0 && (
                <div className="form-step">
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <span className="material-symbols-rounded input-icon">person</span>
                      <input
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        className={errors.name ? 'error' : ''}
                      />
                    </div>
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <span className="material-symbols-rounded input-icon">mail</span>
                      <input
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        className={errors.email ? 'error' : ''}
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
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        className={errors.password ? 'error' : ''}
                      />
                    </div>
                    {errors.password && <span className="error-msg">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-wrapper">
                      <span className="material-symbols-rounded input-icon">lock_reset</span>
                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={e => update('confirmPassword', e.target.value)}
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                    </div>
                    {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="form-step">
                  <div className="form-group">
                    <label>Expected Delivery Date</label>
                    <div className="input-wrapper">
                      <span className="material-symbols-rounded input-icon">calendar_today</span>
                      <input
                        type="date"
                        value={form.deliveryDate}
                        onChange={e => update('deliveryDate', e.target.value)}
                        className={errors.deliveryDate ? 'error' : ''}
                      />
                    </div>
                    {errors.deliveryDate && <span className="error-msg">{errors.deliveryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label>Current Pregnancy Week (Week {form.week})</label>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      value={form.week}
                      onChange={e => update('week', +e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="form-group">
                    <label>Primary Condition</label>
                    <div className="condition-pill">
                      <span className="material-symbols-rounded">monitor_heart</span>
                      Hypertension (Preeclampsia Risk)
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional Conditions (Optional)</label>
                    <div className="input-wrapper">
                      <span className="material-symbols-rounded input-icon">add_circle</span>
                      <input
                        value={form.otherConditions}
                        onChange={e => update('otherConditions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          <div className="form-actions">
            {step > 0 && (
              <Button variant="secondary" onClick={back}>
                Back
              </Button>
            )}

            {step < STEPS.length - 1 ? (
              <Button variant="primary" onClick={next} style={{ marginLeft: 'auto' }}>
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{ marginLeft: 'auto' }}
              >
                Create Account
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup