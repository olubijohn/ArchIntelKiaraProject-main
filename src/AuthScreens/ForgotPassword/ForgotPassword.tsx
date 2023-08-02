import { useFormik } from "formik";
import { Header } from "../../Components/Header";
import { IForgotPassword } from "../../Interface/ISignin";
import * as Yup from "yup";
import nurse from "../../Images/nurse.png";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [next, setNext] = useState<boolean>(false);
  // const navigate = useNavigate();
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    Username: Yup.string().required("Username is required"),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("forgotpassword");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        Username: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: IForgotPassword) => {
    // console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("forgotpassword", JSON.stringify(values));
    setNext(true);
  };

  // Formik form handling
  const formik = useFormik<IForgotPassword>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="signin-component">
      <Header />
      <div className="grid-container">
        <div className="left-grid">
          <div className="img-holder">
            {Circle()}
            {Plus()}
            <img src={nurse} alt="nurse-login" />
            <div>
              <hr />
              <span>{Mark()} Affordable</span>
              <br />
              <span>{Mark()} Accesible</span>
            </div>
          </div>
        </div>
        <div className="right-grid">
          <h3>Forgot password</h3>

          {next === false ? (
            <>
              <div>Provide your email to recover your account</div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="Username"
                    name="Username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Username || ""}
                    placeholder="Enter username"
                    className="field"
                  />
                  {formik.touched.Username && formik.errors.Username && (
                    <div className="error">{formik.errors.Username}</div>
                  )}
                </div>

                <button type="submit">Reset password</button>
              </form>
            </>
          ) : (
            <div className="link-sent">
              A link to reset your password has been sent to your email, kindly
              check your email to reset your password
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function Mark() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3.10417 7.00004L5.69834 9.59421L10.8958 4.40588"
          stroke="#2A9F8F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function Plus() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        className="plus"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 0C11.3431 0 10 1.34314 10 3V10H3C1.34315 10 0 11.3431 0 13V20C0 21.6569 1.34314 23 3 23H10V30C10 31.6569 11.3431 33 13 33H20C21.6569 33 23 31.6569 23 30V23H30C31.6569 23 33 21.6569 33 20V13C33 11.3431 31.6569 10 30 10H23V3C23 1.34315 21.6569 0 20 0H13Z"
          fill="#2D699D"
        />
      </svg>
    );
  }

  function Circle() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="circle"
      >
        <circle cx="10" cy="10" r="7.5" stroke="#2D699D" strokeWidth="5" />
      </svg>
    );
  }
};
