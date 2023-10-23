import "./css/global.css";
import "./socket.js";
// Lib
import { HoneyApp } from "@honeyjs/core";
// Pages & Components
import { Router, Route } from "./components/router";
import Navbar from "./components/navbar";

import Home from "./pages/home";
import Devices from "./pages/devices";

const App = HoneyApp({
  root: document.querySelector("#app")
});

App.render(() => (
  <>
    <Navbar />
    <Router>
      <Route path="/" component={Home} default />
      <Route path="/devices" component={Devices} />
    </Router>
  </>
));