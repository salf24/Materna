import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MaternLogo from '../components/UI/MaternLogo'
import Button from '../components/UI/Button'
import './Landing.css'

const features = [
  { icon:'vital_signs',  title:'Daily Health Tracking',  desc:'Log blood pressure, heart rate, weight and symptoms every day in seconds.' },
  { icon:'psychology',   title:'AI Risk Analysis',        desc:'Our intelligent engine assesses your readings and flags risks before they escalate.' },
  { icon:'medication',   title:'Medication Reminders',    desc:'Never miss a dose — get smart reminders for all your prescriptions.' },
  { icon:'show_chart',   title:'Trend Insights',          desc:'Visualise your health over time and share reports with your midwife.' },
  { icon:'menu_book',    title:'Health Education',        desc:'Evidence-based guides on hypertension, nutrition and warning signs.' },
  { icon:'lock',         title:'Secure & Private',        desc:'Your data is encrypted and only ever accessible to you.' },
]
const steps = [
  { n:'01', title:'Create your account',  desc:'Sign up with your email, set your delivery date and condition profile.' },
  { n:'02', title:'Record your vitals',   desc:'Enter BP, heart rate and symptoms — takes under 60 seconds.' },
  { n:'03', title:'Get AI insights',      desc:'Receive an instant risk score and personalised recommendations.' },
  { n:'04', title:'Track your progress',  desc:'Watch your trends improve and share history with your care team.' },
]
const stats = [
  { value:'40+', label:'Weeks supported' },
  { value:'3',   label:'Trimesters tracked' },
  { value:'AI',  label:'Powered analysis' },
  { value:'24/7',label:'Always available' },
]

const Landing = () => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="landing">
      {/* Navbar */}
      <header className={`landing-nav${scrolled?' scrolled':''}`}>
        <div className="nav-inner">
          <MaternLogo height={36} variant="full" />
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#about">About</a>
          </nav>
          <div className="nav-ctas">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="primary" onClick={() => navigate('/signup')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg-circle c1" />
        <div className="hero-bg-circle c2" />
        <div className="hero-content">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
            <span className="hero-badge">
              <span className="material-symbols-rounded" style={{fontSize:15}}>favorite</span>
              Designed for Kenyan mothers
            </span>
            <h1 className="hero-title">Your pregnancy,<br/><span className="hero-accent">monitored with care</span></h1>
            <p className="hero-subtitle">Materna combines AI-powered risk analysis with daily health tracking to keep you and your baby safe — especially if you have hypertension.</p>
            <div className="hero-ctas">
              <Button variant="primary" size="lg" onClick={() => navigate('/signup')} icon="arrow_forward">Start tracking free</Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>Sign in</Button>
            </div>
          </motion.div>
          <motion.div className="hero-card-stack" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.7,delay:0.2}}>
            <div className="hero-card primary-card">
              <div style={{fontSize:'0.7rem',opacity:.7,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:6}}>Pregnancy Progress</div>
              <div style={{fontSize:'1.8rem',fontWeight:800,lineHeight:1}}>Week 30</div>
              <div style={{fontSize:'0.8rem',opacity:.75,marginTop:4}}>Third Trimester · 10 weeks remaining</div>
              <div style={{height:6,background:'rgba(255,255,255,0.2)',borderRadius:99,marginTop:14}}>
                <div style={{height:'100%',width:'75%',background:'#E67E96',borderRadius:99}} />
              </div>
            </div>
            <div className="hero-card risk-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:'0.68rem',color:'var(--text-muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.6px'}}>AI Risk Status</div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:6,padding:'4px 12px',background:'rgba(163,210,226,0.2)',borderRadius:99,border:'1.5px solid rgba(163,210,226,0.5)'}}>
                    <div style={{width:7,height:7,background:'#A3D2E2',borderRadius:'50%'}} />
                    <span style={{fontWeight:700,color:'#1a6e87',fontSize:'0.9rem'}}>LOW</span>
                  </div>
                </div>
                <span className="material-symbols-rounded" style={{fontSize:28,color:'#A3D2E2'}}>check_circle</span>
              </div>
              <div style={{marginTop:10,fontSize:'0.78rem',color:'var(--text-muted)',lineHeight:1.5}}>All readings stable. Keep up the great work!</div>
            </div>
          </motion.div>
        </div>
        <motion.div className="stats-bar" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.4}}>
          {stats.map((s,i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-label">What Materna offers</div>
          <h2 className="section-title">Everything you need for a safer pregnancy</h2>
          <p className="section-subtitle">Built specifically for expectant mothers managing hypertension.</p>
          <div className="features-grid">
            {features.map((f,i) => (
              <motion.div key={i} className="feature-card"
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.08,duration:0.4}}>
                <div className="feature-icon-box">
                  <span className="material-symbols-rounded" style={{fontSize:24,color:'var(--accent)'}}>{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <div className="section-container">
          <div className="section-label">Simple process</div>
          <h2 className="section-title">Get started in four easy steps</h2>
          <div className="steps-grid">
            {steps.map((s,i) => (
              <motion.div key={i} className="step-card"
                initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.4}}>
                <div className="step-number">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="about">
        <div className="cta-inner">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
            <h2>Start protecting your pregnancy today</h2>
            <p>Join mothers across Kenya who use Materna to stay healthy and informed.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginTop:32}}>
              <Button size="lg" onClick={() => navigate('/signup')} icon="person_add"
                style={{background:'#fff',color:'var(--primary)',boxShadow:'0 4px 14px rgba(0,0,0,0.15)'}}>
                Create free account
              </Button>
              <Button size="lg" onClick={() => navigate('/login')}
                style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1.5px solid rgba(255,255,255,0.4)'}}>
                Sign in
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <MaternLogo height={32} variant="full" />
          <p style={{color:'var(--text-muted)',fontSize:'0.82rem',marginTop:8}}>© {new Date().getFullYear()} Materna · Maternal Health Companion</p>
          <p style={{color:'var(--text-muted)',fontSize:'0.75rem',marginTop:4}}>Not a substitute for professional medical advice. Always consult your healthcare provider.</p>
        </div>
      </footer>
    </div>
  )
}
export default Landing
