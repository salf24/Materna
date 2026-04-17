// Materna AI Risk Engine — runs entirely in the browser
const SYMPTOM_W = { Headache:15, Dizziness:15, 'Blurred Vision':20, Swelling:10, Nausea:5, Other:5 }

export const analyzeRisk = ({ systolic, diastolic, heartRate, weight, symptoms=[], medicationTaken }) => {
  let score = 0, flags = []
  if (systolic>=180||diastolic>=120)      { score+=60; flags.push('hypertensive_crisis') }
  else if (systolic>=160||diastolic>=110) { score+=48; flags.push('severe_htn') }
  else if (systolic>=140||diastolic>=90)  { score+=35; flags.push('stage2_htn') }
  else if (systolic>=130||diastolic>=85)  { score+=20; flags.push('elevated_bp') }
  symptoms.forEach(s => { score+=(SYMPTOM_W[s]||5); flags.push(`sym_${s}`) })
  if (heartRate>100) { score+=7;  flags.push('tachycardia') }
  else if (heartRate<60) { score+=8; flags.push('bradycardia') }
  if (!medicationTaken) { score+=15; flags.push('missed_medication') }

  let riskLevel, color, explanation, recommendations
  if (score>=50) {
    riskLevel='HIGH'; color='#702F40'
    explanation='Your health readings show elevated blood pressure with concerning symptoms. Immediate attention is recommended.'
    recommendations=['Contact your healthcare provider or midwife today','Rest in a left side-lying position to improve blood flow','Avoid physical exertion and stress','Recheck your blood pressure in 30 minutes','If readings worsen, go to the nearest health facility']
  } else if (score>=25) {
    riskLevel='MODERATE'; color='#E67E96'
    explanation='Some readings are slightly outside the normal range. Monitor closely and follow your prescribed care plan.'
    recommendations=['Take any prescribed medication as directed','Rest and drink adequate water (8+ glasses)','Recheck blood pressure in 2–4 hours','Note any new or worsening symptoms','Inform your midwife at your next visit']
  } else {
    riskLevel='LOW'; color='#A3D2E2'
    explanation='Your health readings look stable. Keep up the great work with your daily tracking and medication routine.'
    recommendations=['Continue taking medication as prescribed','Stay hydrated and eat balanced, low-salt meals','Light walking (15–20 min/day) is beneficial','Get enough rest — aim for 8+ hours sleep','Keep your next antenatal appointment']
  }
  return { riskLevel, score, color, flags, explanation, recommendations }
}

export const getRiskColor = l => l==='HIGH'?'#702F40':l==='MODERATE'?'#E67E96':'#A3D2E2'
export const getRiskBg    = l => l==='HIGH'?'#fef2f2':l==='MODERATE'?'#fff1f4':'#f0f9fc'
