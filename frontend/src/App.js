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
import { useState, useEffect } from "react";
import * as userApi from "./utils/api/user-api";
import update from "immutability-helper";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const addFavorite = async (listingId) => {
    try {
      const response = await userApi.addFavorite(user.token, listingId);
      const responseJson = await response.json();
      console.log("REST API response", responseJson);
      if (response.ok) {
        const updatedUser = update(user, {
          favoriteListings: { $set: responseJson.favoriteListings },
        });
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavorite = async (listingId) => {
    try {
      const response = await userApi.removeFavorite(user.token, listingId);
      const responseJson = await response.json();
      console.log("REST API response", responseJson);
      if (response.ok) {
        const updatedUser = update(user, {
          favoriteListings: { $set: responseJson.favoriteListings },
        });
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update localStorage every time user info gets updated (e.g. if they create/delete a listing)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/browse">
            <Navbar />
            <Browse
              user={user}
              setUser={setUser}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/notes">
            <Navbar />
            <Notes
              user={user}
              setUser={setUser}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/profile">
            <Navbar />
            <Profile user={user} setUser={setUser} />
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
