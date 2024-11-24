import React, { useEffect } from 'react'

export default function NoteFound() {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <div className='container notFoundPage'>
        <h1 className='text-2xl font-semibold'>4<span className='zero'>0</span>4</h1>
        <span className='text-2xl sub'>Page Not Found</span>
    </div>
  )
}
