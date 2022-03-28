import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route path="/auth/login">
            <LoginScreen />
          </Route>
          <Route path="/auth/register">
            <RegisterScreen />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: "/auth/login" }} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
