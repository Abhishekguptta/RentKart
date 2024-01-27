import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import '../styles/_form.scss';
import { setRoomData, updateRoomAddress,
        updateRoomCity, 
      updateRoomName, 
      updateRoomOwnerNumber, 
      updateRoomRentalPrice, 
      updateRoomSecurityDeposit, 
      updateRoomSize, updateRoomType } from '../redux/reducer/room';
import { fetchIndividualRoom, updateRoomDetails, uploadRoomImg } from '../apis/room';
import RoomForm from '../component/RoomForm';
import Loader from '../component/Loader';

export default function RoomUpdateForm() {
  const [roomImg, setRoomImg] = useState(null);

  const dispatch = useDispatch()
  const {id} = useParams();
  const slicedId = id.slice(1)

  const { roomData } = useSelector((state) => ({
    roomData: state.roomStore.roomData,
  }),shallowEqual);
  
  const { data, status } = useQuery('', () => fetchIndividualRoom(slicedId), {
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    const handleClick = async() => {
      if(status==='success')
      dispatch(setRoomData(data?.data.data));
    } 
    handleClick();
  },[status])


  const handleImageUpload = useCallback((event) => {
    if(event.target.file)
    setRoomImg(event.target.file[0]);
  }, [])

  const handleUpload =  useCallback(async() => {
    var fd = new FormData();
    fd.append("roomImgs", roomImg); 
    console.log(roomImg);
    const response = await uploadRoomImg(slicedId, fd)
  },[])


  const handleClickButton = useCallback(async (roomData) => {
    try {
      await updateRoomDetails(roomData._id, roomData)
      window.location.reload();
    } catch(e) {
      console.log(e);
    }
  },[])

  const RoomFormAttributes =useMemo(() => [
    {
      label: "Room Title",
      value: roomData.name ?? "",
      tagType: "input",
      handleChange: updateRoomName,
    },
    {
      label: "City",
      value: roomData.city ?? "",
      tagType: "input",
      handleChange: updateRoomCity,
    },
    {
      label: "Rental Price",
      value: roomData.rental_price ?? "",
      tagType: "input",
      handleChange: updateRoomRentalPrice,
    },
    {
      label: "Furnished",
      value: roomData.furnished ?? "",
      tagType: "input",
      handleChange: updateRoomType,
    },
    {
      label: "No of rooms",
      value: roomData.total_bhk ?? "",
      tagType: "input",
      handleChange: updateRoomSize
    },
    {
      label: "Security Deposit",
      value: roomData.security_deposit ?? "",
      tagType: "input",
      handleChange: updateRoomSecurityDeposit,
    },
    {
      label: "Address",
      value: roomData.address ?? "",
      tagType: "text-area",
      handleChange: updateRoomAddress,
    },
    {
      label: "Contact No",
      value: roomData.landlord_contact_no ?? "",
      tagType: "input",
      handleChange: updateRoomOwnerNumber,
    }
  ], [roomData])

  return (<>
    {status==='loading' ? <Loader />
    :<> 
      <RoomForm handleClickButton={handleClickButton} RoomFormAttributes={RoomFormAttributes} formType="Updation"/>
      <input type="file" onChange ={handleImageUpload} />
      <button onClick={handleUpload}>Upload</button>
    </>
    }
  </>
  )
}