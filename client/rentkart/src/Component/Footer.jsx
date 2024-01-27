import React, { useState } from "react";

import Modal from "./Modal";
import '../styles/index.scss';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen ? 
      <div className="terms-modal">
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div> : null}
      <footer className="footer">
        <p>Copyright ⓒ {currentYear} Saffron</p>
        <hr></hr>
        <div className="footer__items">
        {/* <Link  to="/about">About</Link> */}
          <a  href="/about">About</a>
          <div>Contact</div>
          <div className="cursor" onClick={() => setIsOpen(true)}>Terms & Conditions</div>
        </div>
      </footer>
    </>
    );
  }
  
  export default Footer;