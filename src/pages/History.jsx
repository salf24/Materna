import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useHealth } from '../context/HealthContext'
import { getRiskColor } from '../services/aiEngine'
import Card from '../components/UI/Card'
import './History.css'

const RiskBadge = ({ level }) => {
  const c = getRiskColor(level)
  return <span style={{padding:'3px 10px',borderRadius:99,background:`${c}18`,color:c,fontSize:'0.7rem',fontWeight:700,border:`1px solid ${c}44`}}>{level}</span>
}

const History = () => {
  const { healthRecords } = useHealth()
  const [tab, setTab] = useState('chart')
  const chartData = [...healthRecords].reverse().map(r => ({
    date: new Date(r.date).toLocaleDateString('en-KE',{month:'short',day:'numeric'}),
    Systolic: r.systolic, Diastolic: r.diastolic
  }))
  const avg = k => Math.round(healthRecords.reduce((a,r)=>a+r[k],0)/healthRecords.length)

  return (
    <div className="page-wrap" style={{maxWidth:900}}>
      <div className="ph" style={{marginBottom:20}}>
        <h1 className="page-title">Health History</h1>
        <p style={{fontSize:'0.85rem',color:'var(--text-muted)',marginTop:2}}>{healthRecords.length} records tracked</p>
      </div>

      <div className="stats-4">
        {[
          {label:'Avg Systolic', value:`${avg('systolic')}`, unit:'mmHg', icon:'arrow_upward'},
          {label:'Avg Diastolic',value:`${avg('diastolic')}`,unit:'mmHg', icon:'arrow_downward'},
          {label:'High Risk',    value:healthRecords.filter(r=>r.riskLevel==='HIGH').length, unit:'days', icon:'warning'},
          {label:'Medication',   value:`${Math.round(healthRecords.filter(r=>r.medicationTaken).length/healthRecords.length*100)}%`, unit:'',icon:'medication'},
        ].map((s,i) => (
          <Card key={s.label} delay={i*0.05} style={{padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
              <span className="material-symbols-rounded" style={{fontSize:15,color:'var(--accent)'}}>{s.icon}</span>
              <span style={{fontSize:'0.68rem',color:'var(--text-muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>{s.label}</span>
            </div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:'1.35rem',fontWeight:700,color:'var(--primary)'}}>
              {s.value}<span style={{fontSize:'0.72rem',color:'var(--text-muted)',fontWeight:400,marginLeft:2}}>{s.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="tab-row">
        {[{k:'chart',icon:'show_chart',label:'BP Trend'},{k:'list',icon:'list',label:'All Records'}].map(t => (
          <button key={t.k} className={`tab-btn${tab===t.k?' active':''}`} onClick={() => setTab(t.k)}>
            <span className="material-symbols-rounded" style={{fontSize:17}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab==='chart' && (
        <Card delay={0.1}>
          <div style={{fontFamily:'var(--font-heading)',fontWeight:600,marginBottom:16,fontSize:'0.95rem'}}>Blood Pressure Trend (7 Days)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{top:5,right:10,bottom:5,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize:11,fill:'#9ca3af'}} />
              <YAxis tick={{fontSize:11,fill:'#9ca3af'}} domain={[60,180]} />
              <Tooltip contentStyle={{borderRadius:10,border:'1px solid #e5e7eb',fontSize:12,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}} />
              <ReferenceLine y={140} stroke="#702F40" strokeDasharray="4 4" />
              <ReferenceLine y={130} stroke="#f97316" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="Systolic"  stroke="#E67E96" strokeWidth={2.5} dot={{fill:'#E67E96',r:4}} />
              <Line type="monotone" dataKey="Diastolic" stroke="#A3D2E2" strokeWidth={2.5} dot={{fill:'#A3D2E2',r:4}} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{display:'flex',gap:16,marginTop:10,justifyContent:'center'}}>
            {[{c:'#E67E96',l:'Systolic'},{c:'#A3D2E2',l:'Diastolic'}].map(x => (
              <div key={x.l} style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.75rem',color:'var(--text-muted)'}}>
                <div style={{width:22,height:3,background:x.c,borderRadius:99}} />{x.l}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab==='list' && (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {healthRecords.map((r,i) => (
            <Card key={r.id} delay={i*0.04} style={{padding:'14px 18px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
                <div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:5}}>
                    {new Date(r.date).toLocaleDateString('en-KE',{weekday:'short',day:'numeric',month:'short'})}
                  </div>
                  <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
                    <span style={{fontSize:'0.88rem',fontWeight:700,color:'var(--primary)'}}>{r.systolic}/{r.diastolic} <span style={{fontSize:'0.72rem',color:'var(--text-muted)',fontWeight:400}}>mmHg</span></span>
                    <span style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>HR: {r.heartRate} bpm</span>
                    <span style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>{r.weight} kg</span>
                  </div>
                  {r.symptoms?.length>0 && (
                    <div style={{marginTop:5,display:'flex',gap:4,flexWrap:'wrap'}}>
                      {r.symptoms.map(s => <span key={s} style={{fontSize:'0.68rem',padding:'2px 7px',background:'var(--bg)',borderRadius:99,color:'var(--text-muted)',border:'1px solid var(--border)'}}>{s}</span>)}
                    </div>
                  )}
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
                  <RiskBadge level={r.riskLevel} />
                  <span style={{fontSize:'0.7rem',color:r.medicationTaken?'var(--sky-dark)':'var(--plum)',fontWeight:700}}>
                    {r.medicationTaken?'✓ Medication':'✗ Missed'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
export default History
