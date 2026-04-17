import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useHealth } from '../context/HealthContext'
import { getRiskColor, getRiskBg } from '../services/aiEngine'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import './Dashboard.css'

const getRiskIcon = l => l==='HIGH'?'warning':l==='MODERATE'?'info':'check_circle'

const Dashboard = () => {
  const { user } = useAuth()
  const { getLatestRecord } = useHealth()
  const navigate = useNavigate()
  const record = getLatestRecord()
  const h = new Date().getHours()
  const greeting = h<12?'Good morning':h<17?'Good afternoon':'Good evening'
  const week = user?.week || 30
  const trimester = week<=13?'First':week<=26?'Second':'Third'
  const pct = Math.round((week/40)*100)
  const level = record?.riskLevel || 'LOW'
  const rc = getRiskColor(level)
  const rb = getRiskBg(level)

  return (
    <div className="page-wrap">
      {/* Header */}
      <motion.div className="dash-header" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}}>
        <div>
          
          <h1 className="page-title">Welcome, {user?.name?.split(' ')[0] || 'there'}</h1>
          <div className="greeting-week">Week {week} — {trimester} Trimester</div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <button className="icon-btn">
            <span className="material-symbols-rounded" style={{fontSize:22,color:'var(--text-secondary)'}}>notifications</span>
          </button>
        </div>
      </motion.div>

      {/* High-risk alert */}
      {level==='HIGH' && (
        <motion.div className="alert-strip" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}>
          <span className="material-symbols-rounded" style={{color:'var(--plum)',fontSize:20}}>warning</span>
          <div>
            <strong style={{color:'var(--plum)'}}>Health Alert</strong>
            <span style={{marginLeft:8,fontSize:'0.85rem',color:'var(--text-secondary)'}}>Your readings indicate elevated blood pressure. Please recheck or consult a healthcare provider.</span>
          </div>
        </motion.div>
      )}

      <div className="dash-grid">
        {/* Pregnancy Progress */}
        <Card delay={0.05} style={{background:'var(--primary)',border:'none',gridColumn:'span 2'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,letterSpacing:'0.8px',opacity:.65,textTransform:'uppercase',color:'#fff',marginBottom:4}}>Pregnancy Progress</div>
              <div style={{fontSize:'2rem',fontWeight:800,color:'#fff',lineHeight:1,fontFamily:'var(--font-heading)'}}>Week {week}</div>
              <div style={{fontSize:'0.85rem',color:'rgba(255,255,255,0.72)',marginTop:4}}>{trimester} Trimester</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.55)',marginBottom:4}}>Est. Delivery</div>
              <div style={{fontSize:'0.88rem',fontWeight:600,color:'#fff'}}>
                {user?.deliveryDate ? new Date(user.deliveryDate).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'}) : 'Not set'}
              </div>
            </div>
          </div>
          <div style={{marginTop:18}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.7rem',color:'rgba(255,255,255,0.5)',marginBottom:8}}><span>Week 1</span><span>Week 40</span></div>
            <div style={{height:8,background:'rgba(255,255,255,0.15)',borderRadius:99,overflow:'hidden'}}>
              <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1,delay:0.3,ease:'easeOut'}}
                style={{height:'100%',background:'var(--accent)',borderRadius:99}} />
            </div>
            <div style={{textAlign:'center',marginTop:8,fontSize:'0.75rem',color:'rgba(255,255,255,0.6)'}}>
              Week {week} of 40 — {40-week} weeks remaining
            </div>
          </div>
        </Card>

        {/* AI Risk */}
        <Card delay={0.1} style={{border:`1.5px solid ${rc}22`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.8px',color:'var(--text-muted)',textTransform:'uppercase',marginBottom:8}}>AI Risk Status</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:rb,borderRadius:99,padding:'5px 14px',border:`1.5px solid ${rc}44`}}>
                <div style={{width:8,height:8,background:rc,borderRadius:'50%'}} />
                <span style={{fontWeight:700,color:rc,fontSize:'0.95rem',fontFamily:'var(--font-heading)'}}>{level}</span>
              </div>
            </div>
            <span className="material-symbols-rounded" style={{fontSize:30,color:rc,opacity:.75}}>{getRiskIcon(level)}</span>
          </div>
          <div style={{padding:'10px 12px',background:'var(--bg)',borderRadius:'var(--radius-sm)',fontSize:'0.82rem',color:'var(--text-secondary)',lineHeight:1.5}}>
            {level==='HIGH'?'Elevated readings detected. Contact your healthcare provider today.'
            :level==='MODERATE'?'Some readings slightly elevated. Monitor closely and rest.'
            :'All readings look stable. Keep up the great work!'}
          </div>
        </Card>

        {/* Health Entry CTA */}
        <Card delay={0.15} style={{background:'var(--bg)',border:'1.5px dashed var(--border)'}}>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
            <div style={{width:46,height:46,background:'var(--accent)',borderRadius:'var(--radius-md)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span className="material-symbols-rounded" style={{color:'#fff',fontSize:22}}>vital_signs</span>
            </div>
            <div>
              <div style={{fontWeight:600,color:'var(--text-primary)',fontFamily:'var(--font-heading)',marginBottom:2}}>Daily Health Check</div>
              <div style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>Record today's vitals for AI analysis</div>
            </div>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('/health-entry')} icon="add_circle">
            Record Today's Health Data
          </Button>
        </Card>

        {/* Medication */}
        <Card delay={0.2}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.8px',color:'var(--text-muted)',textTransform:'uppercase'}}>Medication Reminder</div>
            <span className="material-symbols-rounded" style={{color:'var(--accent)',fontSize:20}}>medication</span>
          </div>
          {[{drug:'Methyldopa 250mg',time:'08:00 AM',taken:true},{drug:'Ferrous Sulphate',time:'01:00 PM',taken:false},{drug:'Folic Acid 5mg',time:'08:00 PM',taken:false}].map((m,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:i<2?'1px solid var(--border-light)':'none'}}>
              <div style={{width:30,height:30,borderRadius:'var(--radius-sm)',background:m.taken?'rgba(163,210,226,0.2)':'rgba(230,126,150,0.1)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="material-symbols-rounded" style={{fontSize:15,color:m.taken?'var(--sky-dark)':'var(--accent)'}}>{m.taken?'check_circle':'schedule'}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'0.85rem',fontWeight:600,color:'var(--text-primary)'}}>{m.drug}</div>
                <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{m.time}</div>
              </div>
              {m.taken && <span style={{fontSize:'0.7rem',color:'var(--sky-dark)',fontWeight:700}}>Taken</span>}
            </div>
          ))}
        </Card>

        {/* Last reading */}
        <Card delay={0.25}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.8px',color:'var(--text-muted)',textTransform:'uppercase'}}>Last Reading</div>
            <button onClick={() => navigate('/history')} style={{background:'none',border:'none',color:'var(--accent)',fontSize:'0.8rem',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:3}}>
              History <span className="material-symbols-rounded" style={{fontSize:15}}>arrow_forward</span>
            </button>
          </div>
          {record ? (
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[{l:'Systolic',v:`${record.systolic} mmHg`},{l:'Diastolic',v:`${record.diastolic} mmHg`},{l:'Heart Rate',v:`${record.heartRate} bpm`},{l:'Weight',v:`${record.weight} kg`}].map(x => (
                <div key={x.l} style={{background:'var(--bg)',borderRadius:'var(--radius-sm)',padding:'10px 12px'}}>
                  <div style={{fontSize:'0.7rem',color:'var(--text-muted)',marginBottom:2}}>{x.l}</div>
                  <div style={{fontWeight:700,color:'var(--primary)',fontFamily:'var(--font-heading)',fontSize:'0.92rem'}}>{x.v}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.85rem',padding:'16px 0'}}>No records yet. Start tracking!</div>
          )}
        </Card>
      </div>
    </div>
  )
}
export default Dashboard
