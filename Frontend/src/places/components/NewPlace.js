import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validator";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPlace.css";
const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    console.group("submit");
  };

  return (
    <React.Fragment>
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          id="title"
          element="input"
          label="Title"
          type="text"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textArea"
          label="Description"
          placeholder="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (Min. 5 characters)."
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} />
        <hr className="add-modal-line" />
        <div className="add-modal-btn">
          <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
