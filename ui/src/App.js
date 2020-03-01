import React from "react";
import "./App.css";
import PropertyViewer from "./components/PropertyViewer";
import Search from "./components/search";
import TenantPropertyView from "./components/TenantPropertyView";
import PrettyColumn from "./components/PrettyColumn";
import PrimarySearchAppBar from "./components/bar";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="Properties">
          <h1> Owned Property List: </h1>
          <TenantPropertyView />
          <Search />
        <PropertyViewer />
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
