import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/"  component={LandingPage} />
        <Route  path="/login"  component={LoginPage} />
        <Route  path="/register"  component={RegisterPage} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;