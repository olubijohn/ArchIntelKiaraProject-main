import { BsCalendar } from "react-icons/bs";
import { IApplicant, IAppointment } from "../Interface/IAppointment";
import { BiSolidTime } from "react-icons/bi";
import { ISelectedDoctor } from "../Interface/ISelectedDoctor";
import { useEffect, useState } from "react";
import Base64Image from "../Components/Base64Image";

type IYourDetailsProps = {
  switchFormStage: (index: number) => void;
};

export const BookingReview = ({ switchFormStage }: IYourDetailsProps) => {
  const [appointment, setAppointment] = useState<IAppointment>();
  const [applicant, setApplicant] = useState<IApplicant>();

  // console.log("Data: " + appointment.Applicant.FirstName);
  const selected_doctor = localStorage.getItem("selected_doctor");
  const selectedDoctorPayload: ISelectedDoctor = JSON.parse(selected_doctor!);

  useEffect(() => {
    const appointmentValues = localStorage.getItem("appointment");
    const appointment = JSON.parse(appointmentValues!);
    if (appointment) {
      setAppointment(appointment);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const applicantValues = localStorage.getItem("applicant");
      const applicant = JSON.parse(applicantValues!);

      if (applicant) {
        setApplicant(applicant);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  console.log(Base64Image(selectedDoctorPayload.Image));

  return (
    <div className="form-2">
      <h3>Booking Review</h3>

      <div className="nurse-doctor">
        <img
          src={Base64Image(selectedDoctorPayload.Image)}
          alt="nurseordoctor"
        />
        <div>
          <h3>{selectedDoctorPayload.Name}</h3>
          <span>{selectedDoctorPayload.Qualification}</span>
        </div>
      </div>

      <div className="emergency" id="emergency1">
        <BsCalendar className="input-icon" />
        <div>
          <span>Date</span>
          <br />
          <span>{appointment?.AppointmentDate}</span>
        </div>
      </div>

      <div className="emergency" id="emergency1">
        <BiSolidTime className="input-icon" />
        <div>
          <span>Time</span>
          <br />
          <span>{appointment?.AppointmentTime}</span>
        </div>
      </div>

      <div className="emergency" id="emergency1">
        {appointment?.AppointmentType === "Emergency"
          ? Emergency()
          : NonEmergency()}
        <div>
          <span>{appointment?.AppointmentType}</span>
          <br />
          <span>
            {appointment?.AppointmentType === "Emergency"
              ? "You need an urgent attention"
              : "a non urgent situation"}
          </span>
        </div>
      </div>

      <div className="emergency" id="emergency1">
        {SomeoneElse()}
        <div>
          <span>{appointment?.AppointmentApplicant}</span>
          <br />
          <span>
            {appointment?.AppointmentApplicant === "Someone else"
              ? "You’re booking for someone else"
              : "You’re booking for yourself"}
          </span>
        </div>
      </div>

      <div className="emergency" id="emergency1">
        {SomeoneElse()}
        <div>
          <span>{`${applicant?.FirstName} ${applicant?.LastName}`}</span>
          <br />
          <span>{applicant?.Email}</span>
        </div>
      </div>

      <button type="submit" onClick={() => switchFormStage(5)}>
        Confirm booking
      </button>
    </div>
  );

  function SomeoneElse() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12.5 7.5C12.5 8.88071 11.3807 10 10 10C8.61929 10 7.5 8.88071 7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5ZM10 12C8.04133 12 6.30187 12.9385 5.20679 14.3904C6.39509 15.687 8.1026 16.5 10 16.5C11.8974 16.5 13.6049 15.687 14.7932 14.3904C13.6981 12.9385 11.9587 12 10 12Z"
          fill="#0F172A"
        />
      </svg>
    );
  }

  // function Myself() {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="20"
  //       height="20"
  //       viewBox="0 0 20 20"
  //       fill="none"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         clipRule="evenodd"
  //         d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12.5 7.5C12.5 8.88071 11.3807 10 10 10C8.61929 10 7.5 8.88071 7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5ZM10 12C8.04133 12 6.30187 12.9385 5.20679 14.3904C6.39509 15.687 8.1026 16.5 10 16.5C11.8974 16.5 13.6049 15.687 14.7932 14.3904C13.6981 12.9385 11.9587 12 10 12Z"
  //         fill="#0D9488"
  //       />
  //     </svg>
  //   );
  // }

  function Emergency() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.4845 2.49499C9.15808 1.32833 10.842 1.32833 11.5156 2.495L17.7943 13.37C18.4678 14.5367 17.6259 15.995 16.2787 15.995H3.72136C2.37421 15.995 1.53224 14.5367 2.20582 13.37L8.4845 2.49499ZM10 5C10.4142 5 10.75 5.33579 10.75 5.75V9.25C10.75 9.66421 10.4142 10 10 10C9.58579 10 9.25 9.66421 9.25 9.25L9.25 5.75C9.25 5.33579 9.58579 5 10 5ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14Z"
          fill="#EAB308"
        />
      </svg>
    );
  }

  function NonEmergency() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.4845 2.49499C9.15808 1.32833 10.842 1.32833 11.5156 2.495L17.7943 13.37C18.4678 14.5367 17.6259 15.995 16.2787 15.995H3.72136C2.37421 15.995 1.53224 14.5367 2.20582 13.37L8.4845 2.49499ZM10 5C10.4142 5 10.75 5.33579 10.75 5.75V9.25C10.75 9.66421 10.4142 10 10 10C9.58579 10 9.25 9.66421 9.25 9.25L9.25 5.75C9.25 5.33579 9.58579 5 10 5ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14Z"
          fill="#0F172A"
        />
      </svg>
    );
  }
};
