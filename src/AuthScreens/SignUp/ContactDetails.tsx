import { useFormik } from "formik";
import * as Yup from "yup";
import { ISignUp } from "../../Interface/ISignUp";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const ContactDetails = ({ switchFormStage }: IYourDetailsProps) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    MobilePhoneNumber: Yup.string().required("Mobile phone number is required"),
    HomePhoneNumber: Yup.string().required("Home phone number is required"),
    WorkPhoneNumber: Yup.string().required("Work phone number is required"),
    Street: Yup.string().required("Street is required"),
    City: Yup.string().required("City is required"),
    PostalCode: Yup.string().required("Postal code is required"),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("signup");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        MobilePhoneNumber: "",
        HomePhoneNumber: "",
        WorkPhoneNumber: "",
        Street: "",
        City: "",
        PostalCode: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: ISignUp) => {
    console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("signup", JSON.stringify(values));
    switchFormStage(2);
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
        <div className="field-label">Mobile phone number</div>
        <input
          type="tel"
          id="MobilePhoneNumber"
          name="MobilePhoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.MobilePhoneNumber}
          placeholder="Enter your phone number"
          className="field"
        />
        {formik.touched.MobilePhoneNumber &&
          formik.errors.MobilePhoneNumber && (
            <div className="error">{formik.errors.MobilePhoneNumber}</div>
          )}
      </div>

      <div>
        <div className="field-label">Home phone number</div>
        <input
          type="tel"
          id="HomePhoneNumber"
          name="HomePhoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.HomePhoneNumber}
          placeholder="Enter your phone number"
          className="field"
        />
        {formik.touched.HomePhoneNumber && formik.errors.HomePhoneNumber && (
          <div className="error">{formik.errors.HomePhoneNumber}</div>
        )}
      </div>

      <div>
        <div className="field-label">Work phone number</div>
        <input
          type="tel"
          id="WorkPhoneNumber"
          name="WorkPhoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.WorkPhoneNumber}
          placeholder="Enter your phone number"
          className="field"
        />
        {formik.touched.WorkPhoneNumber && formik.errors.WorkPhoneNumber && (
          <div className="error">{formik.errors.WorkPhoneNumber}</div>
        )}
      </div>

      <div>
        <div className="field-label">Street address</div>
        <input
          type="text"
          id="street"
          name="Street"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Street}
          placeholder="Enter your street address"
          className="field"
        />
        {formik.touched.Street && formik.errors.Street && (
          <div className="error">{formik.errors.Street}</div>
        )}
      </div>

      <div>
        <div className="field-label">City</div>
        <input
          type="text"
          id="city"
          name="City"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.City}
          placeholder="Enter city"
          className="field"
        />
        {formik.touched.City && formik.errors.City && (
          <div className="error">{formik.errors.City}</div>
        )}
      </div>

      <div>
        <div className="field-label">Postal code</div>
        <input
          type="text"
          id="postalcode"
          name="PostalCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PostalCode}
          placeholder="000 000"
          className="field"
        />
        {formik.touched.PostalCode && formik.errors.PostalCode && (
          <div className="error">{formik.errors.PostalCode}</div>
        )}
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};
