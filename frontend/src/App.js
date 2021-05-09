import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/browse">
            <Navbar />
            <h1>Browse</h1>
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
