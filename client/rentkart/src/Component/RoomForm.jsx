import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';

import InputField from './InputField'
import '../styles/_form.scss';

export default function RoomForm({handleClickButton, RoomFormAttributes, formType}) {
  const { roomData } = useSelector((state) => ({
    roomData: state.roomStore.roomData,
  }),shallowEqual);

  return (
    <div className='room-form'>
      <h1 className='room-form__heading'>Room {formType} form</h1>
      <div className='room-form__container'>
        <form className='room-form__container--form'>
          <table className='form-table'>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Field</th>
              </tr>
            </thead>
            <tbody>
            {RoomFormAttributes.map((field)=> 
            <tr className='form-table__row'>
              <td className='form-table__row--label'>
                {field.label}
                <span className="required">*</span>
              </td>
              <td>
                <InputField value={field.value} tagType={field.tagType} inputFieldClass='form-table__row--input' onChange={(val) => {
                  console.log(val)
                  field.handleChange(val)()}
                  } />
              </td>
            </tr>
            )}
            </tbody>
          </table>
        </form>
        <div
        onClick={() =>handleClickButton(roomData)}
        className='room-form__container--submit_btn'
        >
        Save Room
        </div>
      </div>
    </div>
  )
}