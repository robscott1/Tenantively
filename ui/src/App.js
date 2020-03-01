import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PropertyViewer from "./components/PropertyViewer";
import Search from "./components/search";
import PrettyColumn from "./components/PrettyColumn";
import PrimarySearchAppBar from "./components/bar";

function App() {
  return (
    <div className="App">
      <li>{"                                                 "}</li>
      <li>{"                                                 "}</li>
      <li>{"                                                 "}</li>
      <PrimarySearchAppBar />
      <div className="Properties">
        <PrettyColumn />
        <Search />
      </div>
    </div>
  );
}

export default App;
