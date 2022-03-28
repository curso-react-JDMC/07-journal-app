import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <AuthRouter />
        </Route>
        <Route exact path="/">
          <JournalScreen />
        </Route>
        <Redirect to={{ pathname: "/auth/login" }} />
      </Switch>
    </BrowserRouter>
  );
};
