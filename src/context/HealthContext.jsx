import React, { createContext, useContext, useState } from 'react'

const HealthContext = createContext(null)
export const useHealth = () => useContext(HealthContext)

const sampleHistory = [
  { id:1, date:'2025-04-05', systolic:138, diastolic:88, heartRate:84, weight:72, symptoms:['Headache'], medicationTaken:true, riskLevel:'MODERATE', explanation:'Some readings slightly elevated.', recommendations:['Monitor closely','Take medication as prescribed'] },
  { id:2, date:'2025-04-04', systolic:125, diastolic:80, heartRate:78, weight:71.8, symptoms:[], medicationTaken:true, riskLevel:'LOW', explanation:'Readings look stable.', recommendations:['Continue medication','Stay hydrated'] },
  { id:3, date:'2025-04-03', systolic:145, diastolic:94, heartRate:90, weight:72.2, symptoms:['Headache','Dizziness','Swelling'], medicationTaken:false, riskLevel:'HIGH', explanation:'Elevated BP with symptoms detected.', recommendations:['Contact healthcare provider immediately','Rest in left side position'] },
  { id:4, date:'2025-04-02', systolic:130, diastolic:82, heartRate:80, weight:71.5, symptoms:['Nausea'], medicationTaken:true, riskLevel:'LOW', explanation:'Stable readings.', recommendations:['Continue care plan'] },
  { id:5, date:'2025-04-01', systolic:128, diastolic:78, heartRate:76, weight:71.4, symptoms:[], medicationTaken:true, riskLevel:'LOW', explanation:'All readings stable.', recommendations:['Maintain routine'] },
  { id:6, date:'2025-03-31', systolic:142, diastolic:92, heartRate:88, weight:71.8, symptoms:['Blurred Vision','Headache'], medicationTaken:true, riskLevel:'HIGH', explanation:'High BP with vision symptoms.', recommendations:['Seek medical attention','Recheck in 30 mins'] },
  { id:7, date:'2025-03-30', systolic:122, diastolic:76, heartRate:74, weight:71.2, symptoms:[], medicationTaken:true, riskLevel:'LOW', explanation:'Excellent readings today.', recommendations:['Keep up the good work'] },
]

export const HealthProvider = ({ children }) => {
  const [healthRecords, setHealthRecords] = useState(sampleHistory)
  const [latestResult, setLatestResult] = useState(null)

  const addRecord = (record) => {
    const newRecord = { ...record, id: Date.now(), date: new Date().toISOString().split('T')[0] }
    setHealthRecords(prev => [newRecord, ...prev])
    setLatestResult(newRecord)
    return newRecord
  }

  const getLatestRecord = () => healthRecords[0] || null

  return (
    <HealthContext.Provider value={{ healthRecords, latestResult, addRecord, getLatestRecord, setLatestResult }}>
      {children}
    </HealthContext.Provider>
  )
}
