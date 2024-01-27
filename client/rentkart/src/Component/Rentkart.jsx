import { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { SET_LOGIN_MODAL_OPEN } from '../redux/action';
import '../index.css';
import '../styles/nav.scss';
import '../styles/index.scss';

import logo from "../images/logo.png"
import HouseLogo from "../images/house.svg"
import Avatar from './Avatar';

export default function Rentkart({userData}) {
const dispatch = useDispatch();

const handleLoginModal = useCallback(() => {
  dispatch({type: SET_LOGIN_MODAL_OPEN, payload: true});
},[dispatch])


  return (
    <header className="header sticky" >
      <a href="/">
        <img 
        src={logo}
        alt="Just Rent it"
        className="logo"/>
      </a>   
      <nav className="navbar ">
        <ul className="navbar-list">
          <li>
            {_.isEmpty(userData) || _.isUndefined(userData) ?
            <h2
              className="bold hoverEffect cursor"
              onClick={handleLoginModal}
            >
              <img src={HouseLogo} alt="logo" />
              List Your Property
            </h2> : 
            <a 
              className="bold cursor hoverEffect"
              href='/landlord'
            >
              <img src={HouseLogo} alt="logo" />
              List Your Property
            </a>
            }
          </li>
          <li>
            {_.isEmpty(userData) || _.isUndefined(userData) ?
              <div 
                onClick={handleLoginModal} 
                className="bold cursor hoverEffect"
              >
                Login
              </div>
              :
              <>
              <Avatar userData={userData.user ?? userData}/> 
              </>
              }
          </li>
        </ul>
      </nav>
    </header>
  )
}
