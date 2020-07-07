import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Places from "./places/pages/places";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import SignUp from "./users/pages/SignUp";
import MainNavigation from "./shared/components/Header/MainNavigation";
import Buddy from "./users/pages/Buddy";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, userID, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/Diary" exact>
          <MainNavigation />
          <Places />
        </Route>
        <Route path="/Buddy" exact>
          <MainNavigation />
          <Buddy />
        </Route>
        <Redirect to="/Diary" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <SignUp />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userID: userID,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
