import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validator";
import "./Input.css";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        isTouched: false,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "CLICK":
      return {
        ...state,
        isTouched: false,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.isValid || false,
    isTouched: false,
  });

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      validators: props.validators,
      val: event.target.value,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const clickHandler = () => {
    dispatch({ type: "CLICK" });
  };
  const { id, onInput } = props;
  const { value, isValid } = state;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        value={state.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        onClick={clickHandler}
        placeholder={props.placeholder}
        style={{ height: "40px" }}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        value={state.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        onClick={clickHandler}
        placeholder={props.placeholder}
        style={{ height: "100px" }}
      />
    );

  return (
    <div
      className={`form-valid ${
        !state.isValid && state.isTouched && "form-invalid"
      }`}
    >
      {element}
      {state.isTouched && !state.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
