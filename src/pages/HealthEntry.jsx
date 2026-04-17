import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import { useHealth } from '../context/HealthContext'
import { analyzeRisk } from '../services/aiEngine'
import './HealthEntry.css'

const SYMPTOMS = ['Headache','Dizziness','Swelling','Blurred Vision','Nausea','Other']

const NumInput = ({ label, value, onChange, min, max, unit, icon }) => (
  <div className="num-group">
    <label className="form-label">{label}</label>
    <div className="num-wrap">
      <span className="material-symbols-rounded num-icon">{icon}</span>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} min={min} max={max} inputMode="numeric" />
      {unit && <span className="num-unit">{unit}</span>}
    </div>
  </div>
)

const HealthEntry = () => {
  const navigate = useNavigate()
  const { addRecord } = useHealth()
  const [form, setForm] = useState({ systolic:120, diastolic:80, heartRate:72, weight:72, symptoms:[], medicationTaken:true })
  const [analyzing, setAnalyzing] = useState(false)
  const update = (k,v) => setForm(f => ({...f,[k]:v}))
  const toggleSym = s => setForm(f => ({ ...f, symptoms: f.symptoms.includes(s) ? f.symptoms.filter(x=>x!==s) : [...f.symptoms,s] }))

  const getBpStatus = () => {
    const s=form.systolic, d=form.diastolic
    if (s>=140||d>=90) return {txt:'Stage 2 Hypertension',col:'var(--plum)'}
    if (s>=130||d>=85) return {txt:'Stage 1 Hypertension',col:'#f97316'}
    if (s>=120)        return {txt:'Elevated',             col:'#f59e0b'}
    return                    {txt:'Normal',               col:'#1a6e87'}
  }
  const bpSt = getBpStatus()

  const handleAnalyze = async () => {
    setAnalyzing(true)
    await new Promise(r => setTimeout(r, 1400))
    const result = analyzeRisk(form)
    addRecord({ ...form, ...result })
    navigate('/results')
  }

  return (
    <div className="page-wrap" style={{maxWidth:700}}>
      <div className="page-hd">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <span className="material-symbols-rounded">arrow_back</span>
        </button>
        <div><h1 className="page-title">Health Entry</h1><p style={{fontSize:'0.85rem',color:'var(--text-muted)',marginTop:2}}>Record today's vitals for AI analysis</p></div>
      </div>

      <div className="entry-stack">
        {/* BP */}
        <Card delay={0.05}>
          <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--accent)',fontSize:20}}>blood_pressure</span><h3>Blood Pressure</h3></div>
          <div className="two-col">
            <NumInput label="Systolic"  value={form.systolic}  onChange={v=>update('systolic',v)}  min={60}  max={220} unit="mmHg" icon="arrow_upward" />
            <NumInput label="Diastolic" value={form.diastolic} onChange={v=>update('diastolic',v)} min={40}  max={140} unit="mmHg" icon="arrow_downward" />
          </div>
          <div className="bp-bar-row">
            {[{l:'Normal',w:30,c:'#A3D2E2'},{l:'Elevated',w:10,c:'#fcd34d'},{l:'Stage 1',w:10,c:'#f97316'},{l:'Stage 2',w:50,c:'#702F40'}].map(b => (
              <div key={b.l} style={{flex:b.w,background:b.c,borderRadius:4,position:'relative',height:10}}>
                <span style={{position:'absolute',bottom:-18,left:'50%',transform:'translateX(-50%)',fontSize:'0.6rem',color:'var(--text-muted)',whiteSpace:'nowrap'}}>{b.l}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:24,fontSize:'0.8rem',color:'var(--text-muted)'}}>
            Current: {form.systolic}/{form.diastolic} mmHg — <strong style={{color:bpSt.col}}>{bpSt.txt}</strong>
          </div>
        </Card>

        {/* Other vitals */}
        <Card delay={0.1}>
          <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--sky-dark)',fontSize:20}}>favorite</span><h3>Other Vitals</h3></div>
          <div className="two-col">
            <NumInput label="Heart Rate" value={form.heartRate} onChange={v=>update('heartRate',v)} min={40} max={180} unit="bpm" icon="favorite" />
            <NumInput label="Weight"     value={form.weight}    onChange={v=>update('weight',v)}    min={30} max={150} unit="kg"  icon="monitor_weight" />
          </div>
        </Card>

        {/* Symptoms */}
        <Card delay={0.15}>
          <div className="sec-hd">
            <span className="material-symbols-rounded" style={{color:'var(--plum)',fontSize:20}}>sick</span>
            <h3>Symptoms</h3>
            <span style={{fontSize:'0.75rem',color:'var(--text-muted)',marginLeft:'auto'}}>Select all that apply</span>
          </div>
          <div className="sym-grid">
            {SYMPTOMS.map(s => (
              <motion.button key={s} whileTap={{scale:0.94}}
                onClick={() => toggleSym(s)}
                className={`sym-chip${form.symptoms.includes(s)?' sel':''}`}>
                <span className="material-symbols-rounded" style={{fontSize:15}}>
                  {form.symptoms.includes(s)?'check_circle':'radio_button_unchecked'}
                </span>
                {s}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Medication */}
        <Card delay={0.2}>
          <div className="sec-hd"><span className="material-symbols-rounded" style={{color:'var(--accent)',fontSize:20}}>medication</span><h3>Medication Taken Today?</h3></div>
          <div className="two-col">
            {[{v:true,icon:'check_circle',label:'Yes, taken',cls:'toggle-yes'},{v:false,icon:'cancel',label:'No, missed',cls:'toggle-no'}].map(opt => (
              <motion.button key={String(opt.v)} whileTap={{scale:0.96}}
                onClick={() => update('medicationTaken',opt.v)}
                className={`toggle-btn${form.medicationTaken===opt.v?' '+opt.cls:''}`}>
                <span className="material-symbols-rounded" style={{fontSize:18}}>{opt.icon}</span>
                {opt.label}
              </motion.button>
            ))}
          </div>
        </Card>

        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.28}}>
          <Button variant="primary" fullWidth size="lg" onClick={handleAnalyze} loading={analyzing} icon="psychology">
            {analyzing ? 'Analysing Health Status...' : 'Analyse Health Status'}
          </Button>
          <div style={{textAlign:'center',marginTop:8,fontSize:'0.75rem',color:'var(--text-muted)'}}></div>
        </motion.div>
      </div>
    </div>
  )
}
export default HealthEntry
