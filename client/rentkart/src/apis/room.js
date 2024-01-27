import { requestApi } from "../utils/ApiRequest";

export const getAllRoomsAvailable = async () => {
  return await requestApi("GET", 'rooms-list');
}

export const fetchIndividualRoom = async (id) => {
  return await requestApi("GET", `room/${id}`)
}

export const fetchAllPostedRooms = async (id) => {
  return await requestApi("GET", `posted-rooms/${id}`)
}

export const updateRoomDetails = async (id, roomData) => {
  return await requestApi("PATCH", `update-room/${id}`, roomData)
}

export const createRoomDetails = async (id, roomData) => {
  return await requestApi("POST", `create-room/${id}`, roomData)
}

export const deleteRoomDetails = async(id) => {
  return await requestApi("DELETE", `delete-room/${id}`);
}

export const uploadRoomImg = async(id, fileData) => {
  return await requestApi("POST", `room/images/${id}`, fileData, "formData");
}

export const shortlistRoom = async(id, userId) => {
  return  await requestApi("POST", `shortlist/room/${id}`, {userId});
}

export const viewApplicants = async(id) => {
  return await requestApi("GET", `view-applicants/${id}`);
}