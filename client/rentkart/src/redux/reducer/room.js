import store from '../store.js';
import { createRoomDetails, updateRoomDetails } from '../../apis/room';
import { SET_ROOM_DATA, SET_ROOM_IS_SHORTLISTED, SET_ROOM_LIST } from '../action';
export const initialState = {
  roomData: {
    name : "",
    city: "",
    rental_price: 0,
    nearby_amenities: [],
    address: "",
    description: "",
    total_bhk: 1,
    landlord_id: "",
    tenant_ids: [],
    room_photos: undefined,
    furnished: "",
    security_deposit: "",
  },
  roomList: [],
  isShortlisted: null,
};

export function updateRoomName(name) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, name };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
    console.log(room);
  };
}

export function updateRoomCity(city) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, city };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomRentalPrice(rental_price) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, rental_price };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomType(furnished) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, furnished };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomSize(total_bhk) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, total_bhk };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomAddress(address) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, address };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomOwnerNumber(landlord_contact_no) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, landlord_contact_no };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function updateRoomSecurityDeposit(security_deposit) {
  return async () => {
    const room = store.getState().roomStore.roomData;
    const updatedRoom = { ...room, security_deposit };
    store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function setRoomData(data) {
  return async () => {
    const updatedRoom =new Object(data);
    await store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function UpdateRoomData(roomId) {
  return async () => {
      console.log("hi")
    const room = store.getState().roomStore.roomData;
    const updatedId = roomId.slice(1)
    const {data} = await updateRoomDetails(updatedId, room)
    window.location.reload();
  };
}

export function setIntialRoomData(landlord_id) {
  return async () => {
    const updatedRoom ={...initialState, landlord_id};
    await store.dispatch({ type: SET_ROOM_DATA, payload: updatedRoom });
  };
}

export function CreateRoomData(landlord_id) {
  return async () => {
    try {
    const room = store.getState().roomStore.roomData;
    const { data } = await createRoomDetails(landlord_id, room)
    window.location.href =`/update/${data.data._id}`;
    } catch(error) {
      console.log(error);
    }
  };
}


///Room Reducer /////

const roomReducer = (state= initialState, actions) => {
  switch(actions.type) {
    case SET_ROOM_DATA: 
      return {
        ...state,
        roomData: actions.payload,
      };
    case SET_ROOM_LIST: 
      return {
        ...state,
        roomList: actions.payload,
      };
    case SET_ROOM_IS_SHORTLISTED: 
      return {
        ...state,
        isShortlisted: actions.payload,
      }   
    default : 
      return state;
  }
}

export default roomReducer;