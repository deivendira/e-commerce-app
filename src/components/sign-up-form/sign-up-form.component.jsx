import "./sign-up-form.styles.scss";
import Button from "../button/button.components";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import { useState } from "react";

import FormInput from "../../form-input/form-input.component.jsx";
const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password not match");
    }
    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered");
      }
      console.log("user ceration encountered error", error);
    }
  };

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span> SignUp with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={changeHandle}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={changeHandle}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit"> SIGN UP</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
