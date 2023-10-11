import { useReducer } from "react";

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
  const [nameState, dispatchName] = useReducer(reducerFun, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(reducerFun, {
    value: "",
    isValid: null,
  });

  let formIsValid = false;

  if (nameState.isValid && emailState.isValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      dispatchName({ type: "UserNameSubmitted" });
      dispatchEmail({ type: "UserEmailSubmitted" });
      return;
    }

    dispatchName({ type: "UserNameBlur" }); //blur here does the same effect that I want if the fields are invalid
    dispatchEmail({ type: "UserEmailBlur" });
  };

  const blurHandler = (input) => {
    if (input === "name") {
      dispatchName({ type: "UserNameBlur" });
    } else {
      dispatchEmail({ type: "UserEmailBlur" });
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
            nameState.isValid === false ? "Empty Field" : "Enter Your Name"
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
            emailState.isValid === false ? "Empty Field" : "Enter Valid Email"
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
