import "./App.css";
import Navbar from "./components/shared/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Browse from "./components/pages/Browse";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Notes from "./components/pages/Notes";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/browse">
            <Navbar />
            <Browse />
          </Route>
          <Route path="/notes">
            <Navbar />
            <Notes />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
