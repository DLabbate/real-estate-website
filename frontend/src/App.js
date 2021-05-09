import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Browse from "./components/pages/Browse";

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
            <h1>Notes</h1>
          </Route>
          <Route exact path="/">
            <Navbar transparentEffect />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
