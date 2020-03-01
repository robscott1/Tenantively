import React, { Component } from "react";
import "./App.css";
import PropertyViewer from "./components/PropertyViewer";
import Search from "./components/search";
import TenantPropertyView from "./components/TenantPropertyView";
import PrettyColumn from "./components/PrettyColumn";
import PrimarySearchAppBar from "./components/bar";
import CurrentLease from "./components/CurrentLease";
<<<<<<< HEAD
import SinglePropViewLandLord from "./components/SinglePropViewLandLord";
=======
import NewLease from "./components/newLease";
import SinglePropViewLandLord from "./components/SinglePropViewLandLord";
import ViewApplicants from "./components/viewApplicants";
import { AppContext } from "./AppContext";
>>>>>>> 1423f62047405ddca32e36063754ef21118c4e7b

class AppProvider extends Component {
  state = {
    lego: "hiiiii"
    // Properties: <List>
    //
    // PropertyManager:
    //   {
    //     id:
    //     properties:
    //     incidents:
    //   },
    // Tenant: {
    //     id:
    //     score:
    //     LeaseContract:
    //     CurrentLease:
    //     Incidents:
    //     Applications
    // }
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <div className="Properties">
            <h1> Owned Property List: </h1>
            <li>{"                                                 "}</li>
            <li>{"                                                 "}</li>
            <ViewApplicants />
            <CurrentLease />
            <TenantPropertyView />
            <SinglePropViewLandLord />
            <Search />
            <li>{"                                                 "}</li>
            <li>{"                                                 "}</li>
            <li>{"                                                 "}</li>
            <PrimarySearchAppBar />
            <div className="Properties">
              <PrettyColumn />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
