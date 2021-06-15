import "./App.css";
import Navbar from "./components/shared/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Browse from "./components/pages/Browse";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import { UserContext } from "./context/UserContext";
import { useMemo, useState } from "react";

function App() {
  const [user, setUser] = useState({});

  // Only recompute the memoized value when one of the dependencies has changed
  // This optimization helps to avoid expensive calculations on every render.
  const memoizedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <UserContext.Provider value={memoizedUser}>
            <Route path="/browse">
              <Navbar />
              <Browse />
            </Route>
            <Route path="/notes">
              <Navbar />
              <h1>Notes</h1>
            </Route>
            <Route path="/profile">
              <Navbar />
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/home">
              <Navbar transparentEffect />
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
