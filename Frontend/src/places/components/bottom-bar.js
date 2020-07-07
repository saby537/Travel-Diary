import React, { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import NewPlace from "./NewPlace";
import "./bottom-bar.css";
const BottomBar = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const openAddConfirmHandler = (event) => {
    setShowAdd(true);
  };
  const cancelConfirmHandler = () => {
    setShowAdd(false);
  };
  return (
    <React.Fragment>
      <Modal
        className="add-modal"
        show={showAdd}
        onCancel={cancelConfirmHandler}
        header="Add New Place"
        headerClass="add-modal-header"
        contentClass="add-modal-content"
        footerClass="no-footer"
      >
        <NewPlace />
      </Modal>
      <div ref={props.inputRef} className="bottombar">
        <div className="add" onClick={openAddConfirmHandler}>
          <img src={`${require("../../Images/add_icon.png")}`} alt="Add View" />
        </div>
        {props.hasItems && (
          <div className="map" onClick={() => props.clickHandler("Map View")}>
            <img
              src={`${require("../../Images/map_view_logo.png")}`}
              alt="Map View"
            />
          </div>
        )}
        {props.hasItems && (
          <div className="edit" onClick={() => props.clickHandler("Edit")}>
            <img src={`${require("../../Images/edit_logo.png")}`} alt="Edit" />
          </div>
        )}
        {props.hasItems && (
          <div className="delete" onClick={() => props.clickHandler("Delete")}>
            <img
              src={`${require("../../Images/delete_logo.png")}`}
              alt="Delete"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BottomBar;
