import React, { useCallback } from 'react'
import { useDispatch, batch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRoomDetails, fetchIndividualRoom } from '../apis/room';
import { useGetInfo } from '../hooks/useGetInfo';

import { SET_ROOM_DATA, SET_USER_DATA } from '../redux/action';
import'../styles/Dropdown.scss'

const Dropdown =({id}) => {
	const [isActive,setActive]=React.useState(false);
	const dispatch = useDispatch()
	const handleUpdate = useCallback(async() => {
		const { data } = await fetchIndividualRoom(id);
			 batch(() => {
			dispatch({type: SET_ROOM_DATA, payload: data.data})
		})
	}, [dispatch,batch])

	/// add snackbar
	const handleDelete = useCallback(async () => {
		await deleteRoomDetails(id);
		const response = await useGetInfo();
		dispatch({type: SET_USER_DATA, payload: response.data});
	}, [])

	const handleOptionClick = useCallback((option) => {
			switch(option.head) {
				case 'Update':
					return handleUpdate();
				case 'Delete': 
					return handleDelete();
				default :
				return null
			} 
		},[])

	const options =[{head: 'Update', link: `update/:${id}`}, {head:'Delete', link: '/landlord'}, {head:'View Applicants', link: 'view-applicants'}]
	return (
	<div className='Dropdown-wrapper'>
		<div className='Dropdown-button' onClick={(e)=>setActive(!isActive)}>								
			{isActive  ? (<div className='Dropdown-content'>
			{options.map((option)=>(
				<Link to={option.link} onClick={() => handleOptionClick(option)}>
					<div className='Dropdown-item'>{option.head}</div>
				</Link>
			))}
			</div>) : null}
		</div>	
	</div>
)}
export default Dropdown;