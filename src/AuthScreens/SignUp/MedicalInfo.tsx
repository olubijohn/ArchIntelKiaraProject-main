import { useFormik } from "formik";
import * as Yup from "yup";
import { ISignUp } from "../../Interface/ISignUp";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const MedicalInfo = ({ switchFormStage }: IYourDetailsProps) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    DateOfBirth: Yup.string().required("Date of birth is required"),
    MedicareNumber: Yup.string().required("Medicare number is required"),
    MedicareLineNumber: Yup.string().required(
      "Medicare line number is required"
    ),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("signup");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        DateOfBirth: "",
        MedicareNumber: "",
        MedicareLineNumber: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: ISignUp) => {
    console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("signup", JSON.stringify(values));
    switchFormStage(3);
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
        <div className="field-label">Date of birth</div>
        <input
          type="date"
          id="DateOfBirth"
          name="DateOfBirth"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.DateOfBirth}
          placeholder="Enter your date of birth"
          className="field"
        />
        {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
          <div className="error">{formik.errors.DateOfBirth}</div>
        )}
      </div>

      <div>
        <div className="field-label">Medicare number</div>
        <input
          type="number"
          id="MedicareNumber"
          name="MedicareNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.MedicareNumber}
          placeholder="Enter your medicare number"
          className="field"
        />
        {formik.touched.MedicareNumber && formik.errors.MedicareNumber && (
          <div className="error">{formik.errors.MedicareNumber}</div>
        )}
      </div>

      <div>
        <div className="field-label">Medicare line number</div>
        <input
          type="number"
          id="MedicareLineNumber"
          name="MedicareLineNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.MedicareLineNumber}
          placeholder="Enter your medicare line number"
          className="field"
        />
        {formik.touched.MedicareLineNumber &&
          formik.errors.MedicareLineNumber && (
            <div className="error">{formik.errors.MedicareLineNumber}</div>
          )}
      </div>

      <button type="submit">Continue</button>
    </form>
  );
};
