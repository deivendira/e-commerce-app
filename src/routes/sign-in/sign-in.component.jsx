import {
  SignInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await SignInWithGooglePopup();
    console.log({ user });
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>this is sign-in page</h1>
      <button onClick={logGoogleUser}> SignIn with Google</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
