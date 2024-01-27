import React from 'react'
import location from '../images/locations.svg'
import "../styles/_room.scss";

 function Description({roomData}) {
  return (
    <div className='room_desc'>
      <h1>{roomData.address}</h1>
      <h2 className='room_desc__name'>{roomData.name}</h2>
      <br/>
      <span className='room_desc__rent'>Rent ₹{roomData.rental_price ?? 'NA'}/- per Month° </span>
      <div className='room_desc__features'>
        <li>{roomData.name}</li>
        <li>For {roomData.for_whom ?? 'everyone'}</li>
        <li>{roomData.furnished ?? 'NA'} Furnished</li>
        <li>Owner Contact: {roomData.landlord_contact_no ?? 'NA'}</li>
      </div>
      <div className='house_facilities p-10'>
        <span className='house_facilities__heading'>House Features</span> 
        <ul>
          {roomData.nearby_amenities?.map((item) => (
            <li className='bold upperCase'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className='house_map_loc'>
        <span className='house_map_loc__title'>
          <img src={location} alt="" />
          <span>Nearby Locations of Your Dream Home</span>
        </span>
        <iframe 
        className='house_map_loc__embed_map'
        width="600"
        height="450"
        style={{border:"0"}}
        loading="lazy"
        allowfullscreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD8cHwZS8hQkdifzDYfOFy3dEMjGSaN3Oo
        &q=${roomData.address}+${roomData.city}`}
      />
      </div>
    </div>
    )
  }
  
  export default Description;
  // 