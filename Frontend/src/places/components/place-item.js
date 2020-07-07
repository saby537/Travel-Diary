import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import "./place-item.css";
const PlaceItem = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const openDeleteConfirmHandler = (event) => {
    setShowDelete(true);
  };
  const cancelConfirmHandler = () => {
    setShowDelete(false);
  };
  const deleteConfirmHandler = () => setShowDelete(false);

  return (
    <React.Fragment>
      <Modal
        show={showDelete}
        onCancel={cancelConfirmHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteConfirmHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        Do you really want to delete the place. Once deleted the place cannot be
        recovered.
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${props.imageURL}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
          </div>
          {props.optionVisible && props.option && (
            <div className="place-item__actions">
              {props.option === "Map View" && (
                <button className="place-button place-button--inverse">
                  MAP VIEW
                </button>
              )}
              {props.option === "Edit" && (
                <button className="place-button">EDIT</button>
              )}
              {props.option === "Delete" && (
                <button
                  className="place-button place-button--danger"
                  onClick={openDeleteConfirmHandler}
                >
                  DELETE
                </button>
              )}
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
