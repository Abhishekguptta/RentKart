import React, { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { createRoomDetails } from '../apis/room';
import RoomForm from '../component/RoomForm';

import { updateRoomAddress,
  updateRoomCity, 
  setIntialRoomData,
updateRoomName, 
updateRoomOwnerNumber, 
updateRoomRentalPrice, 
updateRoomSecurityDeposit, 
updateRoomSize, updateRoomType } from '../redux/reducer/room';

export default function RoomCreate() {
  const dispatch = useDispatch();
  const { userData, roomData } = useSelector((state) => ({
    userData: state.userStore.userData,
    roomData: state.roomStore.roomData,
  }),shallowEqual);

  useEffect(() => {
    dispatch(setIntialRoomData(userData._id));
  }, [userData])

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

  const handleClickButton = useCallback(async (roomData) => {
    try {
      const updatedRoom = {...roomData, landlord_id: userData._id}
      const {data} = await createRoomDetails(userData._id, updatedRoom)
    } catch(e) {
      console.log(e);
    }
  },[])

  return (
    <div>
      <RoomForm formType="Creation" RoomFormAttributes={RoomFormAttributes} handleClickButton={handleClickButton}/>
    </div>
  )
}
