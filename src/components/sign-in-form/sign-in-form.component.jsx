import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.components";
import {
  SignInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";
import { useState } from "react";

import FormInput from "../../form-input/form-input.component.jsx";
const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;

  const resetFormField = () => {
    setFormField(defaultFormField);
  };
  const GoogleSignIn = async () => {
    await SignInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserAuthWithEmailAndPassword(
        email,
        password
      );

      console.log(user);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Your password is wrong");
          break;
        case "auth/user-not-found":
          alert("user is not found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span> SignIn with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          onChange={changeHandle}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={changeHandle}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit"> SIGN IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={GoogleSignIn}
          >
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
