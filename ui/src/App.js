import React from "react";
import "./App.css";
import PropertyViewer from "./components/PropertyViewer";
import Search from "./components/search";
import TenantPropertyView from "./components/TenantPropertyView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a> God DAMMIT I love HACKATHONS!!!!! </a>
      </header>
      <div className="Properties">
          <h1> Owned Property List: </h1>
          <TenantPropertyView />
          <Search />
        <PropertyViewer />
      </div>
    </div>
  );
}

export default App;
