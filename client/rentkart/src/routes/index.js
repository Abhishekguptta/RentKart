import { Outlet, useRoutes } from 'react-router-dom';

import AllRoomList from '../pages/AllRoomList';
import ApplicantsList from '../pages/ApplicantsList';
import LandingPage from '../pages/LandingPage';
import Layout from "../pages/Layout";
import RoomCreate from '../pages/RoomCreate';
import RoomPage from '../pages/RoomPage';
import RoomsPostedList from '../pages/RoomsPostedList';
import RoomUpdateForm from '../pages/RoomUpdateForm';

const RentKartRoutes = [
{
  path: '/',
  element: <Layout><Outlet /></Layout> ,
  children : [
    {
      path: '',
      element: <LandingPage />
    },
    {
      path: 'landlord',
      element: <Outlet />,
      children: [
        {
          path: '',
          element: <RoomsPostedList />
        },
        {
          path: 'post-room',
          element: <RoomCreate />
        },
        {
          path: 'update/:id',
          element: <RoomUpdateForm />
        },
        {
          path: 'view-applicants/:id',
          element: <ApplicantsList />
        },
      ]
    },
    {
      path: 'room-list',
      element: <AllRoomList />
    },
    {
      path: 'room/:id',
      element: <RoomPage />
    },
  ]
}
];

export default function MainRoutes() {
return useRoutes(RentKartRoutes);
}

