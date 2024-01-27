
import React from 'react'

export default function Modal({isOpen, setIsOpen}) {
  return (
    <>
    {isOpen ? 
    <div className='terms-modal__box'>
      <div className='terms-modal__box--heading modal-heading'>
      <h1>Terms and Conditions</h1>
      <button className='modal-heading__close-btn' onClick={() => setIsOpen(false)}>x</button>
      </div>
      <h2>Welcome to RentKart;{')'}</h2>
      <p>
        By accessing this app we assume you accept the following terms and conditions.
        Do not continue to use Rentkart if you do not agree to take all of the terms and conditions stated on this page. 
        You may access Rentkart for your own personal use subjected to restrictions set in the following terms and conditions.
        <br />
        Users must:<br/>
        {'>'}not provide fake information.<br/>
        {'>'}Register themselves and their property listed on our app by providing a valid proof.<br/>
        <br />
        Content Liability:<br />
        We shall not be hold responsible for any content that appears on the app, as it would be as per provided by the users themselves.<br/>
        <br />
        Disclaimer:<br />
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our app, and the use of this app. Nothing in this disclaimer would be:<br />
        {'>'}responsible for your any personal injury<br />
        {'>'}responsible for fraud or fraudulent misrepresentation<br />
        As long as the app and the information and services are provided free of charge, we will not be responsible for any loss or damage of any nature.<br/>
      </p>
    </div> : null }
    </>
  )
}
