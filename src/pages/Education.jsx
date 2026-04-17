import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/UI/Card'
import './Education.css'

const ARTICLES = [
  { id:1, cat:'Hypertension', icon:'blood_pressure', color:'#702F40',
    title:'Managing High Blood Pressure in Pregnancy',
    summary:'Learn how hypertension affects your pregnancy and practical steps to keep it under control.',
    body:`High blood pressure (hypertension) during pregnancy can lead to serious complications if not managed carefully.

Why it matters: Elevated BP reduces blood flow to your baby and raises the risk of preeclampsia — a life-threatening condition that needs immediate care.

Daily management tips:
• Check BP at the same time each day, ideally before eating
• Reduce salt intake — use herbs, lemon, and spices instead
• Rest on your left side to improve circulation to your baby
• Avoid caffeine and processed foods
• Drink at least 8 glasses of water daily

When to seek help immediately:
• Systolic above 160 or diastolic above 110
• Sudden severe headache not relieved by paracetamol
• Vision changes — blurring, flashing lights, seeing spots
• Upper abdominal pain or sudden swelling of face/hands` },
  { id:2, cat:'Medication', icon:'medication', color:'#E67E96',
    title:'Why Your Medication Matters',
    summary:'Understanding your prescribed medications and why consistent use is critical for you and your baby.',
    body:`Taking your prescribed medication consistently is one of the most important actions you can take for a healthy pregnancy.

Common medications for hypertension in pregnancy:
• Methyldopa — Safe and widely used. Relaxes blood vessels
• Labetalol — Controls BP while maintaining safe heart rate
• Nifedipine — Helps blood vessels relax. Avoid grapefruit

Tips for staying consistent:
• Set a daily phone alarm at the same time each day
• Keep medication visible — on your bedside table or kitchen counter
• Never stop medication without consulting your provider
• If you miss a dose, take it as soon as you remember — never double up
• If you experience side effects, contact your midwife promptly

Missing doses can cause dangerous BP spikes that may harm you and your baby.` },
  { id:3, cat:'Warning Signs', icon:'warning', color:'#f97316',
    title:'Recognising Preeclampsia Warning Signs',
    summary:'Early recognition of preeclampsia can save your life and your baby\'s. Know the signs.',
    body:`Preeclampsia is a serious condition that develops after 20 weeks of pregnancy. It progresses rapidly — early detection is critical.

Warning signs — go to hospital IMMEDIATELY if you have:
• Severe headache not relieved by paracetamol
• Vision changes: blurring, flashing lights, seeing spots
• Upper right abdominal pain or shoulder tip pain
• Sudden swelling of the face, hands or feet
• Difficulty breathing or chest pain
• Reduced or no movement from baby

Who is at higher risk:
• First pregnancy
• Multiple babies (twins/triplets)
• Pre-existing hypertension or kidney disease
• BMI over 35
• Age under 20 or over 40

What to do: Do not wait for symptoms to improve on their own. Go to the nearest health facility immediately or call your midwife.` },
  { id:4, cat:'Nutrition', icon:'nutrition', color:'#A3D2E2',
    title:'Nutrition Tips for a Healthy Pregnancy',
    summary:'The right foods can help manage blood pressure and support your baby\'s development.',
    body:`Good nutrition plays a key role in controlling blood pressure and supporting your baby's growth throughout pregnancy.

Foods to include daily:
• Leafy greens (spinach, kale, sukuma wiki) — rich in folate and magnesium
• Bananas and avocados — high in potassium which helps lower BP
• Fish (tilapia, omena) — omega-3 fatty acids for baby brain development
• Dairy (milk, mala) — calcium supports baby's bones and may reduce BP
• Legumes (beans, lentils) — protein and iron without saturated fat

Foods to limit or avoid:
• Salt — aim for less than 5g per day; avoid adding salt at the table
• Processed and fried foods
• Sugary drinks and excessive tea or coffee
• Raw or undercooked meat, eggs and fish

Hydration: Drink at least 8 glasses of clean water daily. Coconut water is a good natural source of electrolytes.` },
]

const Education = () => {
  const [selected, setSelected] = useState(null)

  return (
    <div className="page-content">
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} style={{marginBottom:24}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.5rem',fontWeight:800,color:'var(--primary)'}}>Health Education</h1>
        <p style={{color:'var(--text-muted)',fontSize:'.85rem',marginTop:4}}>Learn to manage your pregnancy health with confidence</p>
      </motion.div>

      <div className="edu-grid">
        {ARTICLES.map((a,i)=>(
          <motion.div key={a.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}>
            <Card hover onClick={()=>setSelected(a)} style={{cursor:'pointer',height:'100%'}}>
              <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:44,height:44,borderRadius:'var(--radius-md)',background:`${a.color}14`,border:`1.5px solid ${a.color}28`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span className="material-symbols-rounded" style={{fontSize:22,color:a.color}}>{a.icon}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                    <span style={{fontSize:'.66rem',fontWeight:800,letterSpacing:'.8px',textTransform:'uppercase',color:a.color,background:`${a.color}12`,padding:'2px 8px',borderRadius:99}}>{a.cat}</span>
                    <span style={{fontSize:'.7rem',color:'var(--text-muted)',display:'flex',alignItems:'center',gap:3}}>
                      <span className="material-symbols-rounded" style={{fontSize:13}}>schedule</span>4 min
                    </span>
                  </div>
                  <div style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'.93rem',color:'var(--text-primary)',marginBottom:5,lineHeight:1.3}}>{a.title}</div>
                  <div style={{fontSize:'.8rem',color:'var(--text-secondary)',lineHeight:1.55}}>{a.summary}</div>
                </div>
              </div>
              <div style={{color:a.color,fontSize:'.78rem',fontWeight:700,marginTop:14,display:'flex',alignItems:'center',gap:4}}>
                Read article <span className="material-symbols-rounded" style={{fontSize:14}}>arrow_forward</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}>
            <motion.div className="modal-box" initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} exit={{y:50,opacity:0}} onClick={e=>e.stopPropagation()}>
              <div className="modal-head" style={{borderBottomColor:selected.color}}>
                <div style={{display:'flex',alignItems:'center',gap:12,flex:1}}>
                  <span className="material-symbols-rounded" style={{fontSize:22,color:selected.color,flexShrink:0}}>{selected.icon}</span>
                  <div>
                    <div style={{fontSize:'.68rem',color:selected.color,fontWeight:800,textTransform:'uppercase',letterSpacing:'.8px'}}>{selected.cat}</div>
                    <h2 style={{fontFamily:'var(--font-heading)',fontSize:'1.05rem',fontWeight:800,color:'var(--primary)',lineHeight:1.3}}>{selected.title}</h2>
                  </div>
                </div>
                <button onClick={()=>setSelected(null)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',padding:4,flexShrink:0}}>
                  <span className="material-symbols-rounded" style={{fontSize:24}}>close</span>
                </button>
              </div>
              <div className="modal-body">
                {selected.body.split('\n\n').map((para,i)=>(
                  <p key={i} style={{marginBottom:14,lineHeight:1.75,fontSize:'.9rem',color:'var(--text-secondary)'}}>
                    {para.split('\n').map((line,j,arr)=>(
                      <span key={j}>{line}{j<arr.length-1&&<br/>}</span>
                    ))}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default Education
