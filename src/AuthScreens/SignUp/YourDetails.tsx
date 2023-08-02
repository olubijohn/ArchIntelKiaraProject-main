import { useFormik } from "formik";
import { ISignUp } from "../../Interface/ISignUp";
import * as Yup from "yup";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const YourDetails = ({ switchFormStage }: IYourDetailsProps) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Gender: Yup.string().required("Gender is required"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("signup");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        FirstName: "",
        LastName: "",
        Gender: "",
        Email: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: ISignUp) => {
    // console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("signup", JSON.stringify(values));
    switchFormStage(1);
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
        <div className="field-label">First Name</div>
        <input
          type="text"
          id="FirstName"
          name="FirstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FirstName || ""}
          placeholder="Enter your first name"
          className="field"
        />
        {formik.touched.FirstName && formik.errors.FirstName && (
          <div className="error">{formik.errors.FirstName}</div>
        )}
      </div>

      <div>
        <div className="field-label">Last Name</div>
        <input
          type="text"
          id="LastName"
          name="LastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.LastName || ""}
          placeholder="Enter your last name"
          className="field"
        />
        {formik.touched.LastName && formik.errors.LastName && (
          <div className="error">{formik.errors.LastName}</div>
        )}
      </div>

      <div>
        <div className="field-label">Gender</div>
        <select
          id="Gender"
          name="Gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Gender || ""}
          className="field gender"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.touched.Gender && formik.errors.Gender && (
          <div className="error">{formik.errors.Gender}</div>
        )}
      </div>

      <div>
        <div className="field-label">Email</div>
        <input
          type="email"
          id="Email"
          name="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Email || ""}
          placeholder="Enter your Email"
          className="field"
        />
        {formik.touched.Email && formik.errors.Email && (
          <div className="error">{formik.errors.Email}</div>
        )}
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};
