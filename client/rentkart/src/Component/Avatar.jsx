import React, { useCallback } from 'react'
import FallbackImg from '../images/img_placeholder.svg';
import '../styles/_avatar.scss';
import { mockColors } from '../utils/Cards';

export default function Avatar({userData}) {
  const color = mockColors[ (userData.name).length % 6];
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('user')
    window.location.href = '/';
  },[])
  return (
    <div className='flex-row align-c'>
      <h2 className='bold hoverEffect cursor p-10' onClick={handleLogout}>Logout</h2>
    {/* {userData.thumbnail ? 
    <img src={userData.thumbnail}
     alt={userData.name}
     onError={(e) => (e.currentTarget.src = FallbackImg)} 
    />: */}
    <div style={{background: `${color}`}} className='avatar avatar_initials'>
      {userData.name[0]}
    </div>
    {/* } */}
    </div>
  )
}
