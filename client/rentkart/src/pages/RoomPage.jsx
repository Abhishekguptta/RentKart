import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual, batch } from 'react-redux';
import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom';
import { fetchIndividualRoom, shortlistRoom } from '../apis/room';
import Description from '../component/Description';
import Loader from '../component/Loader';
import like from '../images/like.svg';
import isLiked from '../images/liked.svg';
import { setRoomData } from '../redux/reducer/room';

import '../styles/index.scss';
import { SET_ROOM_IS_SHORTLISTED } from '../redux/action';

export default function RoomPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const slicedId = id.slice(1);

  const { userData, isShortlisted } = useSelector((state) => ({
    userData: state.userStore.userData,
    isShortlisted: state.roomStore.isShortlisted,
  }), shallowEqual);

  const { data: roomData, status } = useQuery('', () =>fetchIndividualRoom(slicedId) ,{
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if(status === 'success'){
    const flag = roomData.data?.data?.tenant_ids?.includes(userData._id);
    dispatch({type: SET_ROOM_IS_SHORTLISTED, payload: flag})
    }
    else
    dispatch({type: SET_ROOM_IS_SHORTLISTED, payload: false})
  },[status]);


  // example of stale closure here 
  const handleShortlist = useCallback(async(userData) => {
    try { 
        const value = async() => {
          return await shortlistRoom(slicedId, userData._id);
        }
        const { data } = await value();
      dispatch({type: SET_ROOM_IS_SHORTLISTED, payload: data.data});
    } catch(e) {
      console.log(e);
    }},[])

    useEffect(() => {
    if(status==='success')
    dispatch(setRoomData(roomData.data?.data))
    },[status])


  return (
    <div className='room_page'>
     {status === 'loading' ? <Loader /> : 
     <>
      {/* <ShowCarousel roomData = {roomData.data} /> */}
        {userData._id && (userData._id !== roomData.data.data.landlord_id) ? 
        <>
          <img className='cursor' src= {isShortlisted ? isLiked : like} alt="apply" onClick={() => handleShortlist(userData)} width={25} height={25}/>
        </> : null
        }
      <Description roomData={roomData.data.data} />
     </>
     }
    </div>
  )
}
