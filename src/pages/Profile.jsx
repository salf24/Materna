import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useHealth } from '../context/HealthContext'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import './Profile.css'

const ToggleSwitch = ({ value, onChange }) => (
  <button className={`tog-sw${value?' on':''}`} onClick={() => onChange(!value)}>
    <div className="tog-thumb" />
  </button>
)

const Profile = () => {
  const { user, logout, updateUser } = useAuth()
  const { healthRecords } = useHealth()
  const navigate = useNavigate()

  const u = user || { name:'Salma Wanjiru', email:'salma@example.com', week:30, conditions:['Hypertension'], deliveryDate:'2025-07-10' }

  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name:        u.name || '',
    email:       u.email || '',
    deliveryDate:u.deliveryDate || '',
    week:        u.week || 30,
  })
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState({ medAlert:true, bpReminder:true, riskNotif:true })
  const updatePref = (k,v) => setPrefs(p => ({...p,[k]:v}))
  const updateEdit = (k,v) => setEditForm(f => ({...f,[k]:v}))

  const handleSave = () => {
    updateUser(editForm)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const trimester = w => w<=13?'First':w<=26?'Second':'Third'

  return (
    <div className="page-wrap" style={{maxWidth:600}}>
      <div className="ph" style={{marginBottom:20}}>
        <h1 className="page-title">Profile</h1>
        <p style={{fontSize:'0.85rem',color:'var(--text-muted)',marginTop:2}}>Manage your account and pregnancy details</p>
      </div>

      {saved && (
        <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
          style={{background:'rgba(163,210,226,0.15)',border:'1.5px solid var(--sky-dark)',borderRadius:'var(--radius-md)',padding:'10px 16px',display:'flex',alignItems:'center',gap:10,marginBottom:14,fontSize:'0.87rem',color:'#1a6e87',fontWeight:600}}>
          <span className="material-symbols-rounded" style={{fontSize:18}}>check_circle</span>
          Profile updated successfully
        </motion.div>
      )}

      {/* Profile hero */}
      <Card delay={0.05} style={{background:'var(--primary)',border:'none',marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <div style={{width:64,height:64,background:'var(--accent)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span className="material-symbols-rounded" style={{fontSize:32,color:'#fff'}}>person</span>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:'1.18rem',fontWeight:700,color:'#fff'}}>{u.name}</div>
            <div style={{opacity:.65,fontSize:'0.83rem',color:'#fff',marginTop:2}}>{u.email}</div>
            <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
              {u.conditions?.map(c => (
                <span key={c} style={{background:'rgba(230,126,150,0.25)',border:'1px solid rgba(230,126,150,0.5)',color:'#f9a8b8',borderRadius:99,padding:'2px 10px',fontSize:'0.7rem',fontWeight:600}}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:18}}>
          {[{l:'Current Week',v:`Wk ${u.week}`},{l:'Records',v:healthRecords.length},{l:'Trimester',v:trimester(u.week||30)}].map(s => (
            <div key={s.l} style={{background:'rgba(255,255,255,0.1)',borderRadius:'var(--radius-md)',padding:'12px',textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-heading)',fontSize:'1.25rem',fontWeight:700,color:'#fff'}}>{s.v}</div>
              <div style={{fontSize:'0.68rem',opacity:.6,marginTop:2,color:'#fff'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pregnancy details*/}
      <Card delay={0.1} style={{marginBottom:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span className="material-symbols-rounded" style={{fontSize:20,color:'var(--accent)'}}>pregnant_woman</span>
            <span style={{fontFamily:'var(--font-heading)',fontWeight:600,fontSize:'0.95rem'}}>Pregnancy Details</span>
          </div>
          <button className="edit-toggle-btn" onClick={() => { setEditing(!editing); if(editing) setEditForm({name:u.name,email:u.email,deliveryDate:u.deliveryDate,week:u.week}) }}>
            <span className="material-symbols-rounded" style={{fontSize:16}}>{editing?'close':'edit'}</span>
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div key="view" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              {[
                {label:'Full Name',        value:u.name},
                {label:'Email Address',    value:u.email},
                {label:'Current Week',     value:`Week ${u.week} of 40`},
                {label:'Trimester',        value:trimester(u.week||30)},
                {label:'Expected Delivery',value:u.deliveryDate ? new Date(u.deliveryDate).toLocaleDateString('en-KE',{day:'numeric',month:'long',year:'numeric'}) : 'Not set'},
                {label:'Primary Condition',value:'Hypertension'},
              ].map(d => (
                <div key={d.label} className="detail-row">
                  <span className="detail-lbl">{d.label}</span>
                  <span className="detail-val">{d.value}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="edit" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="edit-form">
              <div className="edit-field">
                <label>Full Name</label>
                <div className="edit-input-wrap">
                  <span className="material-symbols-rounded" style={{fontSize:18,color:'var(--text-muted)',padding:'0 10px'}}>person</span>
                  <input type="text" value={editForm.name} onChange={e => updateEdit('name',e.target.value)} />
                </div>
              </div>
              <div className="edit-field">
                <label>Email Address</label>
                <div className="edit-input-wrap">
                  <span className="material-symbols-rounded" style={{fontSize:18,color:'var(--text-muted)',padding:'0 10px'}}>mail</span>
                  <input type="email" value={editForm.email} onChange={e => updateEdit('email',e.target.value)} />
                </div>
              </div>
              <div className="edit-field">
                <label>Expected Delivery Date</label>
                <div className="edit-input-wrap">
                  <span className="material-symbols-rounded" style={{fontSize:18,color:'var(--text-muted)',padding:'0 10px'}}>calendar_today</span>
                  <input type="date" value={editForm.deliveryDate} onChange={e => updateEdit('deliveryDate',e.target.value)} />
                </div>
              </div>
              <div className="edit-field">
                <label>Current Pregnancy Week — Week {editForm.week}</label>
                <div style={{display:'flex',alignItems:'center',gap:14,marginTop:6}}>
                  <input type="range" min={1} max={40} value={editForm.week}
                    onChange={e => updateEdit('week',+e.target.value)}
                    style={{flex:1,accentColor:'var(--accent)',height:6}} />
                  <span style={{fontWeight:700,color:'var(--primary)',fontSize:'1.05rem',minWidth:52,textAlign:'right'}}>Wk {editForm.week}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.7rem',color:'var(--text-muted)',marginTop:4}}><span>1</span><span>40</span></div>
              </div>
              <div style={{background:'rgba(230,126,150,0.06)',border:'1px solid rgba(230,126,150,0.3)',borderRadius:'var(--radius-sm)',padding:'10px 12px',fontSize:'0.78rem',color:'var(--text-secondary)',lineHeight:1.5,display:'flex',gap:8,alignItems:'flex-start'}}>
                <span className="material-symbols-rounded" style={{fontSize:15,color:'var(--accent)',flexShrink:0,marginTop:1}}>info</span>
                If your delivery date has changed after a scan, update it here. Your pregnancy week will also be recalculated.
              </div>
              <Button variant="primary" fullWidth onClick={handleSave} icon="save" style={{marginTop:4}}>Save Changes</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Notifications */}
      <Card delay={0.15} style={{marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <span className="material-symbols-rounded" style={{fontSize:20,color:'var(--sky-dark)'}}>notifications</span>
          <span style={{fontFamily:'var(--font-heading)',fontWeight:600,fontSize:'0.95rem'}}>Notification Preferences</span>
        </div>
        {[
          {k:'medAlert',  label:'Medication Reminders', desc:'Daily alerts for medication doses'},
          {k:'bpReminder',label:'BP Check Reminders',   desc:'Morning prompts to record readings'},
          {k:'riskNotif', label:'AI Risk Alerts',       desc:'Notifications when risk level changes'},
        ].map(p => (
          <div key={p.k} className="pref-row">
            <div><div className="pref-lbl">{p.label}</div><div className="pref-desc">{p.desc}</div></div>
            <ToggleSwitch value={prefs[p.k]} onChange={v => updatePref(p.k,v)} />
          </div>
        ))}
      </Card>

      <Button variant="danger" fullWidth size="lg" onClick={() => { logout(); navigate('/login') }} icon="logout">
        Logout
      </Button>
    </div>
  )
}
export default Profile
