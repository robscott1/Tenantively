import React from "react";
import "./App.css";
import PropertyViewer from "./components/PropertyViewer";
import Search from "./components/search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a> God DAMMIT I love HACKATHONS!!!!! </a>
      </header>
      <div className="Properties">
          <Search />
        <PropertyViewer />
      </div>
    </div>
  );
}

export default App;
