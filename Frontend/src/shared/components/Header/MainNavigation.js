import React, { useState } from "react";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import NewInput from "../FormElements/New-Inputs";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {DrawerOpen && <BackDrop onClick={closeDrawer} />}
      <SideDrawer show={DrawerOpen}>
        <nav className="main-navigation__drawer">
          <NavLinks />
        </nav>
      </SideDrawer>
      <header className="main-header">
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <NewInput
          type="text"
          id="Search"
          placeholder="Destination"
          showButton="search"
          class="center-search"
        />
        <nav className="main-navigation__header">
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
