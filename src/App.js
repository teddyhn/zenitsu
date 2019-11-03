import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Library from "./components/Library/Library";
import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Route exact path="/library" component={Library} />
      <Route exact path="/sign-in" component={Login} />
    </Router>
  );
}

export default App;
