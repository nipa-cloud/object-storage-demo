import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import SideBar from "./components/SideBar";
import Content from "./components/Content";
import "./App.css";

const App = () => {
  const [sideBarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sideBarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sideBarIsOpen} />
        <Content toggleSideBar={toggleSidebar} sideBarIsOpen={sideBarIsOpen} />
      </div>
    </Router>
  );
};

export default App;
