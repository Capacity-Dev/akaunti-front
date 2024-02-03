import React from 'react'
import { Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function ProtectedRoute(props) {
    const {isAuthenticated} = useAuth()
    //let {pathname} = useLocation()

    if (!isAuthenticated()){
      return <Navigate to="/login" replace={true} />
    }

    //let wantDashboardRoute = /^\/dashboard/.test(pathname)?true: false;
    /* if((wantDashboardRoute && user.privillege == "user") || (!wantDashboardRoute && user.privillege == "admin")) {
      logout()
      //return <Navigate to="/login" replace={true} />
    } */
  return (
    <>
    {props.children}
    </>
  )
}
