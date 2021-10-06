import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProviders";

import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route}></RouteWithSubRoutes>
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <route.component routes={route.routes} {...props}></route.component>
      )}
    ></Route>
  );
}

export default App;
