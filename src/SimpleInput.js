import { useEffect, useReducer, useState } from "react";

const reducerFun = (state, action) => {
  if (action.type === "UserNameChange") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "UserNameBlur") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  if (action.type === "UserNameSubmitted") {
    return { value: "", isValid: state.value.trim().length > 0 };
  }
  if (action.type === "UserEmailChange") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "UserEmailBlur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  if (action.type === "UserEmailSubmitted") {
    return { value: "", isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};

const SimpleInput = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [nameState, dispatchName] = useReducer(reducerFun, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(reducerFun, {
    value: "",
    isValid: null,
  });

  // console.log("d");
  // console.log(nameState.isValid);

  useEffect(() => {
    //console.log("x");
    setFormIsValid(nameState.isValid && emailState.isValid);
  }, [nameState.isValid, emailState.isValid]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatchName({ type: "UserNameSubmitted" });
    dispatchEmail({ type: "UserEmailSubmitted" });
  };

  const blurHandler = (input) => {
    if (input === "name") {
      dispatchName({ type: "UserNameBlur" });
    } else {
      dispatchName({ type: "UserEmailBlur" });
    }
  };

  const changeHandler = (input, value) => {
    if (input === "name") {
      dispatchName({ type: "UserNameChange", val: value });
    } else {
      dispatchEmail({ type: "UserEmailChange", val: value });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`form-control ${
          nameState.isValid === false ? "invalid" : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameState.value}
          placeholder={
            nameState.isValid === false ? "Empty Field" : "Enter Something..."
          }
          onChange={(event) => {
            changeHandler("name", event.target.value);
          }}
          onBlur={() => {
            blurHandler("name");
          }}
        />
      </div>

      <div
        className={`form-control ${
          emailState.isValid === false ? "invalid" : ""
        }`}
      >
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          value={emailState.value}
          placeholder={
            emailState.isValid === false ? "Empty Field" : "Enter Something..."
          }
          onChange={(event) => {
            changeHandler("email", event.target.value);
          }}
          onBlur={() => {
            blurHandler("email");
          }}
        />
      </div>

      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
