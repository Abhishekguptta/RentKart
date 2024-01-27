import React, { useCallback, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch, batch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import _ from 'lodash';

import { SET_LOGIN_MODAL_OPEN, SET_USER_DATA } from '../redux/action';
import { updateSnackbarMessage, updateSnackbarOpenState, updateSnackbarSeverityType } from '../redux/reducer/common';
import { useGetInfo } from '../hooks/useGetInfo';

import AuthModal from '../component/AuthModal';
import Footer from '../component/Footer';
import Rentkart from '../component/Rentkart';
import SideBar from '../component/Sidebar';

export default function Layout({children}) {
  const dispatch = useDispatch();

  const handleLoginModal = useCallback(() => {
    dispatch({type: SET_LOGIN_MODAL_OPEN, payload: false});
  },[dispatch])

  const { isLoginModalOpen, userData,  snackBarData} = useSelector((state) => ({
    isLoginModalOpen: state.userStore.isLoginModalOpen,
    userData: state.userStore.userData,
    snackBarData: state.commonStore.snackBarData,
  }), shallowEqual);


  // set user sessioon token in sessionStorage
  useEffect(() => {
    if(!(_.isEmpty(userData)) && userData?.token) {
    sessionStorage.setItem('user', JSON.stringify(userData.token))
    }
  },[userData])


  // get user session token from sessionStorage

  useEffect(() => {
    const getInfo = async() => {
      try {
        const authToken = sessionStorage.getItem('user');
        if(authToken && (_.isEmpty(userData) || _.isUndefined(userData))) {
          const { data }  = await useGetInfo();
          console.log(data);
          dispatch({type: SET_USER_DATA, payload: data});
        }
      }catch(error) {
        batch(() => {
          dispatch(updateSnackbarOpenState(true));
          dispatch(updateSnackbarMessage(error.message));
          dispatch(updateSnackbarSeverityType('error'));
        })
      }
    }
      getInfo();
  }, [])

  return (
    <div>
      <Rentkart userData={userData}/>
        <SideBar isOpen={isLoginModalOpen}>
        <button className='sidebar-closeBtn' onClick={handleLoginModal}>X</button>
        <AuthModal />
       </SideBar>
      <div className='main-container'>
        {children}
      </div>
      <Snackbar
        open={snackBarData.isOpen}
        autoHideDuration={1500}
        onClose={() => {
          dispatch(updateSnackbarOpenState(false));
        }}
      >
        <Alert variant="filled" severity={snackBarData.severityType} sx={{ width: '100%' }}>
          {snackBarData.message}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  )
}
