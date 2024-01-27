import React from 'react'
import '../styles/_loader.scss';

export default function Loader() {
  return (
    <div className='loader-box'>
      <h1>Please wait...</h1>
      <div className='loader' />
    </div>
  )
}
