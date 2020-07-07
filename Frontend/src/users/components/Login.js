import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validator.js";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Login.css";
const Login = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [form, inputHandler, setInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchHandler = () => {
    if (!isLogin) {
      setInputHandler(
        {
          ...form.inputs,
          mobile: undefined,
        },
        form.inputs.username.isValid && form.inputs.password.isValid
      );
    } else {
      setInputHandler(
        {
          ...form.inputs,
          mobile: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };
  let height = 62;
  let top = 75;
  let fb_margin = 15;
  if (!isLogin) {
    height = 69;
    top = 82;
    fb_margin = -10;
  }

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("1 Logging in...");
      const responseData = await sendRequest(
        "http://localhost:5000/users/login",
        "POST",
        JSON.stringify({
          email: form.inputs.username.value,
          password: form.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token);
    } catch (err) {}
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    console.log("Signing Up...");
    try {
      console.log(form);
      const responseData = await sendRequest(
        "http://localhost:5000/users/signup",
        "POST",
        JSON.stringify({
          name: form.inputs.mobile.value,
          email: form.inputs.username.value,
          password: form.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="login" style={{ height: `${height}%` }}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="logo">
          <img src={`${require("../../Images/logo_1.png")}`} alt="logo" />
        </div>
        {isLogin && (
          <form className="login-form" onSubmit={loginHandler}>
            <Input
              id="username"
              type="text"
              element="input"
              validators={[VALIDATOR_EMAIL()]}
              placeholder="Username, Phone Number"
              errorText="Please enter correct username"
              onInput={inputHandler}
            />
            <Input
              id="password"
              type="password"
              element="input"
              validators={[VALIDATOR_MINLENGTH(5)]}
              placeholder="Password"
              errorText="Please enter atleat 5 letter password"
              onInput={inputHandler}
            />
            <Button className="form-btn" type="submit" disabled={!form.isValid}>
              Log In
            </Button>
          </form>
        )}
        {isLogin && (
          <div className="fancy">
            <span>OR</span>
          </div>
        )}
        <NavLink
          to="/"
          className="fb-btn"
          style={{ margin: `${fb_margin}px 5%` }}
        >
          <i className="fa fa-facebook fa-fw"></i> Login with Facebook
        </NavLink>
        {!isLogin && (
          <div className="fancy" style={{ marginTop: "8%" }}>
            <span>OR</span>
          </div>
        )}
        {!isLogin && (
          <form className="signup-form" onSubmit={signupHandler}>
            <Input
              id="mobile"
              type="text"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              placeholder="Mobile Number"
              onInput={inputHandler}
            />
            <Input
              id="username"
              type="text"
              element="input"
              validators={[VALIDATOR_EMAIL()]}
              placeholder="Username, Phone Number"
              errorText="Please enter correct username"
              onInput={inputHandler}
            />
            <Input
              id="password"
              type="password"
              element="input"
              validators={[VALIDATOR_MINLENGTH(5)]}
              placeholder="Password"
              errorText="Please enter atleat 5 letter password"
              onInput={inputHandler}
            />
            <Button className="form-btn" type="submit" disabled={!form.isValid}>
              Sign Up
            </Button>
          </form>
        )}
      </Card>
      <Card className="signup" style={{ top: `${top}vh` }}>
        {isLogin && (
          <p>
            Dont have an account ? {"   "}
            <b onClick={switchHandler}> Sign Up </b>
          </p>
        )}
        {!isLogin && (
          <p>
            Have an account ? {"   "}
            <b onClick={switchHandler}> Log In </b>
          </p>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Login;
