import { useFormik } from "formik";
import * as Yup from "yup";
import { IApplicant, IAppointment } from "../Interface/IAppointment";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const SomeoneElseForm = ({ switchFormStage }: IYourDetailsProps) => {
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
  const storedValues = localStorage.getItem("applicant");
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
  const handleSubmit = (values: IApplicant) => {
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("applicant", JSON.stringify(values));
    const applicantValues = localStorage.getItem("applicant");
    const initialValue: IApplicant = JSON.parse(applicantValues!);

    const appointmentValues = localStorage.getItem("appointment");
    const initialValues: IAppointment = JSON.parse(appointmentValues!);
    initialValues.Applicant = initialValue;
    localStorage.setItem("appointment", JSON.stringify(initialValues));
    // switchFormStage(1);
  };

  // Formik form handling
  const formik = useFormik<IApplicant>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="form">
      <h3>About Patient</h3>
      <form>
        <div>
          <div className="field-label">First Name</div>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.FirstName || ""}
            placeholder="Enter first name"
            className="field someone"
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
            placeholder="Enter last name"
            className="field someone"
          />
          {formik.touched.LastName && formik.errors.LastName && (
            <div className="error">{formik.errors.LastName}</div>
          )}
        </div>

        <div>
          <div className="field-label">Phone Number</div>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PhoneNumber || ""}
            placeholder="Enter phone number"
            className="field someone"
          />
          {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
            <div className="error">{formik.errors.PhoneNumber}</div>
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
            className="field someone"
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
            type="text"
            id="Email"
            name="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Email || ""}
            placeholder="Enter your email"
            className="field someone"
          />
          {formik.touched.Email && formik.errors.Email && (
            <div className="error">{formik.errors.Email}</div>
          )}
        </div>

        <div>
          <div className="field-label">Date of birth</div>
          <input
            type="date"
            id="DateOfBirth"
            name="DateOfBirth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.DateOfBirth || ""}
            // placeholder="Enter date"
            className="field someone"
          />
          {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
            <div className="error">{formik.errors.DateOfBirth}</div>
          )}
        </div>

        <div>
          <div className="field-label">Street address</div>
          <input
            type="text"
            id="StreetAddress"
            name="StreetAddress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.StreetAddress || ""}
            placeholder="Enter your street address"
            className="field someone"
          />
          {formik.touched.StreetAddress && formik.errors.StreetAddress && (
            <div className="error">{formik.errors.StreetAddress}</div>
          )}
        </div>

        <div>
          <div className="field-label">City</div>
          <input
            type="text"
            id="City"
            name="City"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.City || ""}
            placeholder="Enter your city"
            className="field someone"
          />
          {formik.touched.City && formik.errors.City && (
            <div className="error">{formik.errors.City}</div>
          )}
        </div>

        <div>
          <div className="field-label">Postal code</div>
          <input
            type="text"
            id="PostalCode"
            name="PostalCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PostalCode || ""}
            placeholder="000 000"
            className="field someone"
          />
          {formik.touched.PostalCode && formik.errors.PostalCode && (
            <div className="error">{formik.errors.PostalCode}</div>
          )}
        </div>

        <button
          type="submit"
          onClick={() => {
            formik.handleSubmit();
            switchFormStage(4);
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};
