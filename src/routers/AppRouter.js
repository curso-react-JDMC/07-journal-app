import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "./../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setisLoggedIn(true);
      }else{
        setisLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <h1>Espere...</h1>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/auth" isAuth={isLoggedIn}>
          <AuthRouter />
        </PublicRoute>
        <PrivateRoute exact path="/" isAuth={isLoggedIn}>
          <JournalScreen />
        </PrivateRoute>
        <Redirect to={{ pathname: "/auth/login" }} />
      </Switch>
    </BrowserRouter>
  );
};
