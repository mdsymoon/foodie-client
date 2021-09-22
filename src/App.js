import "./App.css";
import Home from "./Components/HomePage/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Components/DashboardPage/Dashboard/Dashboard";
import { createContext, useState } from "react";

export const ItemsContext = createContext();
function App() {
  const [items, setItems] = useState({});

  



  return (
    <ItemsContext.Provider value={[items, setItems]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </Router>
    </ItemsContext.Provider>
  );
}

export default App;
