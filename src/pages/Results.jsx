import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useHealth } from '../context/HealthContext'
import { getRiskColor, getRiskBg } from '../services/aiEngine'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import './Results.css'

const Results = () => {
  const navigate = useNavigate()
  const { latestResult, getLatestRecord } = useHealth()
  const record = latestResult || getLatestRecord()

  if (!record) return (
    <div className="page-wrap" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',gap:16}}>
      <span className="material-symbols-rounded" style={{fontSize:56,color:'var(--text-muted)'}}>psychology</span>
      <p style={{color:'var(--text-muted)'}}>No analysis yet. Record your health data first.</p>
      <Button variant="primary" onClick={() => navigate('/health-entry')} icon="vital_signs">Record Health Data</Button>
    </div>
  )

  const level = record.riskLevel || 'LOW'
  const rc = getRiskColor(level)
  const rb = getRiskBg(level)
  const icon = level==='HIGH'?'warning':level==='MODERATE'?'info':'check_circle'

  return (
    <div className="page-wrap results-page" style={{maxWidth:700}}>
      <div className="page-hd">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <span className="material-symbols-rounded">arrow_back</span>
        </button>
        <div>
          <h1 className="page-title">AI Analysis Results</h1>
          <p style={{fontSize:'0.82rem',color:'var(--text-muted)',marginTop:2}}>
            {new Date().toLocaleDateString('en-KE',{weekday:'long',day:'numeric',month:'long'})}
          </p>
        </div>
      </div>

      {/* Risk */}
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.35,delay:0.05}}
        style={{background:rb,border:`2px solid ${rc}33`,borderRadius:'var(--radius-xl)',padding:'32px 24px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:10,marginBottom:14}}>
        <div style={{width:78,height:78,borderRadius:'50%',background:`${rc}18`,border:`2px solid ${rc}44`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span className="material-symbols-rounded" style={{fontSize:46,color:rc}}>{icon}</span>
        </div>
        <div style={{fontSize:'0.7rem',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:rc,opacity:.8}}>Risk Level</div>
        <div style={{fontFamily:'var(--font-heading)',fontSize:'2.4rem',fontWeight:800,color:rc,lineHeight:1}}>{level}</div>
        <p style={{fontSize:'0.9rem',color:'var(--text-secondary)',lineHeight:1.65,maxWidth:420}}>{record.explanation}</p>
      </motion.div>

      {/* Vitals */}
      <Card delay={0.15}>
        <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--sky-dark)',fontSize:20}}>vital_signs</span><h3 style={{fontFamily:'var(--font-heading)',fontWeight:600}}>Today's Readings</h3></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {[{l:'Systolic',v:record.systolic,u:'mmHg',icon:'arrow_upward',alert:record.systolic>=140},{l:'Diastolic',v:record.diastolic,u:'mmHg',icon:'arrow_downward',alert:record.diastolic>=90},{l:'Heart Rate',v:record.heartRate,u:'bpm',icon:'favorite',alert:record.heartRate>100},{l:'Weight',v:record.weight,u:'kg',icon:'monitor_weight',alert:false}].map(x => (
            <div key={x.l} style={{background:'var(--bg)',borderRadius:'var(--radius-md)',padding:'12px 10px',display:'flex',flexDirection:'column',alignItems:'center',gap:4,border:x.alert?'1.5px solid rgba(112,47,64,0.3)':'1.5px solid transparent',textAlign:'center'}}>
              <span className="material-symbols-rounded" style={{fontSize:16,color:x.alert?'var(--plum)':'var(--sky-dark)'}}>{x.icon}</span>
              <div style={{fontFamily:'var(--font-heading)',fontSize:'1.1rem',fontWeight:700,color:'var(--primary)',lineHeight:1}}>{x.v}<span style={{fontSize:'0.68rem',color:'var(--text-muted)',fontWeight:400}}> {x.u}</span></div>
              <div style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{x.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card delay={0.22}>
        <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--accent)',fontSize:20}}>tips_and_updates</span><h3 style={{fontFamily:'var(--font-heading)',fontWeight:600}}>Recommendations</h3></div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {(record.recommendations||[]).map((r,i) => (
            <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.28+i*0.06}}
              style={{display:'flex',alignItems:'flex-start',gap:12,fontSize:'0.88rem',color:'var(--text-secondary)',lineHeight:1.55}}>
              <div style={{width:24,height:24,background:'var(--accent)',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
              <span>{r}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {record.symptoms?.length>0 && (
        <Card delay={0.3}>
          <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--plum)',fontSize:20}}>sick</span><h3 style={{fontFamily:'var(--font-heading)',fontWeight:600}}>Reported Symptoms</h3></div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {record.symptoms.map(s => <span key={s} style={{padding:'5px 13px',background:'rgba(112,47,64,0.08)',border:'1px solid var(--plum)',borderRadius:99,fontSize:'0.8rem',color:'var(--plum)',fontWeight:600}}>{s}</span>)}
          </div>
        </Card>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <Button variant="secondary" onClick={() => navigate('/history')} icon="history">View History</Button>
        <Button variant="primary"   onClick={() => navigate('/health-entry')} icon="refresh">New Entry</Button>
      </div>

      {level==='HIGH' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
          style={{padding:'14px 18px',background:'rgba(112,47,64,0.06)',border:'1.5px solid var(--plum)',borderRadius:'var(--radius-md)',display:'flex',gap:12,alignItems:'flex-start'}}>
          <span className="material-symbols-rounded" style={{color:'var(--plum)',fontSize:20,flexShrink:0}}>local_hospital</span>
          <div>
            <div style={{fontWeight:700,color:'var(--plum)',fontSize:'0.9rem',marginBottom:4}}>Seek Medical Attention</div>
            <div style={{fontSize:'0.8rem',color:'var(--text-secondary)',lineHeight:1.5}}>Contact your healthcare provider or visit a health facility today. Do not ignore these symptoms.</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default Results
