import React, { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <div>Dashboard</div>
  )
}
