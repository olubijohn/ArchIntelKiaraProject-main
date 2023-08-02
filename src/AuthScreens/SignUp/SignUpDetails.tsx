import { useFormik } from "formik";
import * as Yup from "yup";
import { ISignUp } from "../../Interface/ISignUp";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const SigninDetails = ({ switchFormStage }: IYourDetailsProps) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    UserName: Yup.string().required("Username is required"),
    Password: Yup.string().required("Password is required"),
    ConfirmPassword: Yup.string().required("Password is required"),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("signup");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        UserName: "",
        Password: "",
        ConfirmPassword: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: ISignUp) => {
    console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("signup", JSON.stringify(values));
    switchFormStage(4);
  };

  // Formik form handling
  const formik = useFormik<ISignUp>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="field-label">Username</div>
        <input
          type="text"
          id="UserName"
          name="UserName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.UserName}
          placeholder="Enter your username"
          className="field"
        />
        {formik.touched.UserName && formik.errors.UserName && (
          <div className="error">{formik.errors.UserName}</div>
        )}
      </div>

      <div>
        <div className="field-label">Password</div>
        <input
          type="password"
          id="Password"
          name="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Password}
          placeholder="Enter your password"
          className="field"
        />
        {formik.touched.Password && formik.errors.Password && (
          <div className="error">{formik.errors.Password}</div>
        )}
      </div>

      <div>
        <div className="field-label">Password</div>
        <input
          type="password"
          id="ConfirmPassword"
          name="ConfirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ConfirmPassword}
          placeholder="Re-enter your password"
          className="field"
        />
        {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword && (
          <div className="error">{formik.errors.ConfirmPassword}</div>
        )}
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};
