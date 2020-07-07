import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.id) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_INPUT":
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialValidity) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, validity) => {
    dispatch({
      type: "INPUT_CHANGE",
      id,
      value,
      isValid: validity,
    });
  }, []);
  const setInputHandler = useCallback((initialInputs, initialValidity) => {
    dispatch({
      type: "SET_INPUT",
      inputs: initialInputs,
      isValid: initialValidity,
    });
  }, []);

  return [state, inputHandler, setInputHandler];
};
