import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css'
import XSS from "./pages/XSS"
import CSRF from "./pages/CSRF"
import DDoS from "./pages/DDoS"
import Home from "./pages/Home"

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Route path="/" extact component={Home}/>
              <Route path="/xss" component={XSS}/>
              <Route path="/csrf" component={CSRF}/>
              <Route path="/ddos" component={DDoS}/>
          </Router>
      </div>
    );
  }
}

export default App;
