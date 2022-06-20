import "./button.styles.scss";
const Button_type_clasess = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherprops }) => {
  return (
    <button className={`button-container ${Button_type_clasess[buttonType]}`}>
      {children}
    </button>
  );
};
export default Button;
