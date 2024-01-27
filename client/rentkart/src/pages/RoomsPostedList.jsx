import React, { useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import Card from '../component/Card'
import Dropdown from '../component/Dropdown';
import { fetchAllPostedRooms } from '../apis/room';
import Loader from '../component/Loader';
import { SET_ROOM_LIST } from '../redux/action';
import Notfound from '../images/Not_found.svg';

export default function RoomsPostedList() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { userData, roomList } = useSelector((state) => ({
    userData: state.userStore.userData,
    roomList: state.roomStore.roomList,
  }), shallowEqual);

  useEffect(() => {
      const fetchPostRoom = async () => {
      if(!(_.isEmpty(userData))) {
        const {data} = await fetchAllPostedRooms(userData._id)
        ref.current = await data;
        dispatch({type: SET_ROOM_LIST, payload: data.data});
      }
    }
    fetchPostRoom();
  }, [userData])

  return (
    <div style={{paddingTop: '5rem'}}>
      <div className='flex-row align-c justify-space'>
      <h1>All Posted Rooms</h1>
      <Link to="post-room">
        <button className='rentkart_button cursor'>+</button>
      </Link>
      </div>
      {(_.isEmpty(roomList) &&  ref.current === null) ?
      <Loader /> :
      <>
      {!(_.isEmpty(roomList)) ?
        <div className='flex-row'>
          {roomList?.map((card) =>(
            <>
            <Card roomPhoto={card.room_photos ?? null} description={card.address} key={card._id} rentalPrice={card.rental_price}>
              <Dropdown id={card._id}/>
            </Card>
            </>
          ))}
        </div>
        :
        <div style={{position: "absolute", top: "40%", left: "40%", textAlign: "center"}}>
         <img src={Notfound} alt="empty" width={40} height={40} /> 
         <h2>No rooms posted yet</h2>
        </div>
      }
      </>
      }
    </div>
  )
}
