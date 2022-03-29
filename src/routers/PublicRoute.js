import React from 'react'
import { Redirect } from 'react-router-dom';


export const PublicRoute = ({ isAuth,children }) => {

  return isAuth
        ? <Redirect to="/" />
        : children
}