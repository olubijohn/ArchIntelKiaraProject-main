import kiara from "../Images/kiara1bg.png";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosArrowDown } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAppointment } from "../Interface/IAppointment";
import { BsCalendar } from "react-icons/bs";
import { BiSolidTime } from "react-icons/bi";
import { SomeoneElseForm } from "./SomeoneElseForm";
import { BookingReview } from "./BookingReview";
import * as routes from "../Data/Routes";
import { useNavigate } from "react-router-dom";
import { MediaQueryMatchers, useMediaQuery } from "react-responsive";

export const Appointment = () => {
  const navigate = useNavigate();
  const [dateState, setDateState] = useState(new Date());
  const [showCalendar, setshowCalendar] = useState<boolean>(false);
  const [showTime, setshowTime] = useState<boolean>(false);
  const [lastHour, setLastHour] = useState<string>("");
  const [lastMinute, setLastMinute] = useState<string>("");
  const [hour, sethour] = useState<string>("01");
  const [minute, setMinute] = useState<string>("00");
  const [meridian, setMeridian] = useState<string>("AM");
  const [border, setBorder] = useState<string>("");

  const isMobile = useMediaQuery({ maxWidth: 992 } as MediaQueryMatchers);
  // const isDesktop = useMediaQuery({ minWidth: 768 } as MediaQueryMatchers);

  const hours = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  const changeDate = (e: any) => {
    setDateState(e);
    formik.values.AppointmentDate = e.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const changeBgHour = (index: number, time: string) => {
    const currentTime = document.getElementById(`hour${index}`);
    const lastTimeId = document.getElementById(lastHour);
    if (lastTimeId) lastTimeId.style.backgroundColor = "";
    if (currentTime) {
      currentTime.style.backgroundColor = "gray";
      setLastHour(`hour${index}`);
      sethour(time);
      formik.values.AppointmentTime = time + ":" + minute + " " + meridian;
    }
  };

  const changeBgMinute = (index: number, time: string) => {
    const currentTime = document.getElementById(`minute${index}`);
    const lastTimeId = document.getElementById(lastMinute);
    if (lastTimeId) lastTimeId.style.backgroundColor = "";
    if (currentTime) {
      currentTime.style.backgroundColor = "gray";
      setLastMinute(`minute${index}`);
      setMinute(time);
      formik.values.AppointmentTime = hour + ":" + time + " " + meridian;
    }
  };

  const changeMeridian = (merid: string) => {
    const currentMerid = document.getElementById(merid);
    const lastMerid = document.getElementById(merid === "AM" ? "PM" : "AM");
    if (lastMerid) lastMerid.style.backgroundColor = "";
    if (currentMerid) {
      currentMerid.style.backgroundColor = "gray";
      formik.values.AppointmentTime = hour + ":" + minute + " " + merid;
      setMeridian(merid);
    }
  };

  const [formStage, setFormStage] = useState<number>(0);
  const switchFormStage = (index: number) => {
    setFormStage(index);
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    AppointmentDate: Yup.string().required("Appointment date is required"),
    AppointmentTime: Yup.string().required("Appointment time is required"),
  });

  // Initial form values
  // Fetch form values from storage
  const storedValues = localStorage.getItem("appointment");
  const initialValues = storedValues
    ? JSON.parse(storedValues)
    : {
        AppointmentDate: "",
        AppointmentTime: "",
      };

  // console.log("init: ", storedValues);

  // Submit handler
  const handleSubmit = (values: IAppointment) => {
    // console.log(values);
    // Add your signup logic here

    // Save form values in storage
    localStorage.setItem("appointment", JSON.stringify(values));
    if (formStage === 5) navigate(routes.dashboard);
  };

  // Formik form handling
  const formik = useFormik<IAppointment>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const isEmergency = (IsEmergency: string) => {
    formik.values.AppointmentType = IsEmergency;
  };
  const Applicant = (applicant: string) => {
    formik.values.AppointmentApplicant = applicant;
  };

  const applyBorder = (index: number) => {
    const emergency = document.getElementById(`emergency${index}`);
    const applicant = document.getElementById(`applicant${index}`);

    if (index < 3) {
      if (emergency) {
        const emergency2 = document.getElementById(border);
        if (emergency2) emergency2.style.border = "";
        emergency.style.border = "1.5px solid #2D699D";
        setBorder(`emergency${index}`);
      }
    }
    if (index > 2) {
      if (applicant) {
        const applicant2 = document.getElementById(lastHour);
        if (applicant2) applicant2.style.border = "";
        applicant.style.border = "1.5px solid #2D699D";
        setLastHour(`applicant${index}`);
      }
    }
  };

  return (
    <div className="booking-component">
      <div className="grid-container">
        <div className="left-grid">
          <img
            src={kiara}
            alt="kiara"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(routes.homepage)}
          />
          <div className="content">
            {InformationComponent("Date & Time", "...", 0, formStage)}
            {InformationComponent("About this practice ", "...", 1, formStage)}
            {InformationComponent("Appointment type", "...", 2, formStage)}
            {InformationComponent("Personal details", "...", 3, formStage)}
          </div>
        </div>
        <div className="middle-grid">
          <img
            src={kiara}
            alt="kiara"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(routes.homepage)}
          />
          {formStage === 0 ? (
            DateTimeSection()
          ) : formStage === 1 ? (
            <div className="about-practise">
              <h3>About this practise</h3>
              {AboutContentHolder(
                "Billing policy",
                "We are mixed billing from 1st march 2023 and offer bulk billing to patients under 16, DVA card holders, pensioners, and other concession card holders except on Saturdays. There will be an out-of-pocket expense for all general consultations. Please visit our website for more details."
              )}
              {AboutContentHolder(
                "Cancellation / non-attendance policy",
                "If you can no longer attend the appointment, please cancel or reschedule through your confirmation email or Healthengine app. Please note a fee of $[amount] may apply if you cancel less than 2 hours prior to your appointment or fail to attend your appointment"
              )}
              {AboutContentHolder(
                "New patient policy",
                "New patients are not eligible for Tele-health consultations . If you are a new patient please select as a new patient when booking the appointment - kindly arrive 10 mins before to register and finish paper work. If you Do not Attend your booked appointment you will be still charged a DNA fee."
              )}
              {AboutContentHolder(
                "Drug prescription policy",
                "Appointments are required to obtain a prescription. We do not prescribe any restricted drugs to any new patients."
              )}
              {AboutContentHolder(
                "COVID-19 policy",
                "When you arrive at the practice, please remain in your car and call the practice to let them know you have arrived. After a short triage process, the staff will inform you if you can enter the practice. You are required to wear a mask when attending your appointment."
              )}
              {AboutContentHolder(
                "Other practice policy",
                "We are mixed billing from 1st march 2023 and offer bulk billing to patients under the age of 16, DVA card holders, pensioners, and other concession card holders except on Saturdays."
              )}
              <button type="submit" onClick={() => switchFormStage(2)}>
                Continue
              </button>
            </div>
          ) : formStage === 2 ? (
            <div className="form-2">
              <h3>Appointment type</h3>
              <div
                className="emergency"
                onClick={() => {
                  isEmergency("Emergency");
                  applyBorder(1);
                }}
                id="emergency1"
              >
                {Emergency()}
                <div>
                  <span>Emergency</span>
                  <br />
                  <span>You need an urgent attention</span>
                </div>
              </div>
              <div
                className="emergency"
                onClick={() => {
                  isEmergency("Non-Emergency");
                  applyBorder(2);
                }}
                id="emergency2"
              >
                {NonEmergency()}
                <div>
                  <span>Non-emergency</span>
                  <br />
                  <span>A non urgent situation</span>
                </div>
              </div>
              <h3>Who is this appointment for?</h3>
              <div
                className="emergency"
                onClick={() => {
                  Applicant("Myself");
                  applyBorder(3);
                }}
                id="applicant3"
              >
                {Myself()}
                <div>
                  <span>Myself</span>
                  <br />
                  <span>You’re booking for yourself</span>
                </div>
              </div>
              <div
                className="emergency"
                onClick={() => {
                  Applicant("Someone else");
                  applyBorder(4);
                }}
                id="applicant4"
              >
                {SomeoneElse()}
                <div>
                  <span>Someone else</span>
                  <br />
                  <span>You’re booking for someone else</span>
                </div>
              </div>
              <button
                type="submit"
                onClick={() => {
                  formik.handleSubmit();
                  switchFormStage(3);
                }}
              >
                Continue
              </button>
            </div>
          ) : formStage === 3 ? (
            <SomeoneElseForm switchFormStage={switchFormStage} />
          ) : formStage === 4 ? (
            <BookingReview switchFormStage={switchFormStage} />
          ) : (
            <div className="form-2">
              <h3>Congratulation</h3>
              <div>Your booking is comfirmed</div>

              <button type="submit" onClick={() => formik.handleSubmit()}>
                Go to dashboard
              </button>
            </div>
          )}
        </div>
        {isMobile ? (
          <></>
        ) : (
          <div className="right-grid">
            <div className="nav">
              <span className="contact-us">Contact us</span>
              <div className="user">
                {userSVG()} <span>Olalekan Ayodeji</span>
                <IoIosArrowDown style={{ margin: "4px 0px 0px 12px" }} />
              </div>
            </div>
            {showCalendar && formStage === 0 && (
              <div className="calendar">
                <Calendar value={dateState} onChange={changeDate} />
              </div>
            )}
            {showTime && formStage === 0 && (
              <div className="time-holder">
                <div className="hours">
                  {hours.map((time: number, index: number) => {
                    let stime = time < 10 ? `0${time}` : `${time}`;
                    return (
                      <div
                        onClick={() => changeBgHour(index, `${stime}`)}
                        key={index}
                      >
                        <div id={`hour${index}`}>{stime}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="minutes">
                  {minutes.map((time: number, index: number) => {
                    let stime = time < 10 ? `0${time}` : `${time}`;
                    return (
                      <div
                        onClick={() => changeBgMinute(index, `${stime}`)}
                        key={index}
                      >
                        <div id={`minute${index}`}>{stime}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="meridian">
                  {["AM", "PM"].map((merid: string, index: number) => {
                    return (
                      <div
                        id={`${merid}`}
                        onClick={() => changeMeridian(merid)}
                        key={index}
                      >
                        {merid}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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

  function Myself() {
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
          fill="#0D9488"
        />
      </svg>
    );
  }

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

  function AboutContentHolder(title: string, content: string) {
    return (
      <div className="about-content">
        <div className="title">
          {AboutIcon()} {title}
        </div>
        <div className="content">{content}</div>
      </div>
    );
  }

  function AboutIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M8.17766 13.2532L7.5 15.625L6.82234 13.2532C6.4664 12.0074 5.4926 11.0336 4.24682 10.6777L1.875 10L4.24683 9.32234C5.4926 8.9664 6.4664 7.9926 6.82234 6.74682L7.5 4.375L8.17766 6.74683C8.5336 7.9926 9.5074 8.9664 10.7532 9.32234L13.125 10L10.7532 10.6777C9.5074 11.0336 8.5336 12.0074 8.17766 13.2532Z"
          stroke="#0F172A"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2157 7.26211L15 8.125L14.7843 7.26212C14.5324 6.25444 13.7456 5.46764 12.7379 5.21572L11.875 5L12.7379 4.78428C13.7456 4.53236 14.5324 3.74556 14.7843 2.73789L15 1.875L15.2157 2.73788C15.4676 3.74556 16.2544 4.53236 17.2621 4.78428L18.125 5L17.2621 5.21572C16.2544 5.46764 15.4676 6.25444 15.2157 7.26211Z"
          stroke="#0F172A"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.0785 17.1394L13.75 18.125L13.4215 17.1394C13.2348 16.5795 12.7955 16.1402 12.2356 15.9535L11.25 15.625L12.2356 15.2965C12.7955 15.1098 13.2348 14.6705 13.4215 14.1106L13.75 13.125L14.0785 14.1106C14.2652 14.6705 14.7045 15.1098 15.2644 15.2965L16.25 15.625L15.2644 15.9535C14.7045 16.1402 14.2652 16.5795 14.0785 17.1394Z"
          stroke="#0F172A"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function DateTimeSection() {
    return (
      <div className="form">
        <h3>Schedule Appointment</h3>
        <div className="span">
          Choose a day and time you will be available to see the doctor
        </div>
        <form>
          <div className="field-label">
            <div className="input-group">
              <BsCalendar className="input-icon" />
              <input
                type={isMobile ? "date" : "text"}
                id="AppointmentDate"
                name="AppointmentDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.AppointmentDate}
                placeholder="Date"
                className="field"
                onFocus={() => {
                  setshowTime(false);
                  setshowCalendar(true);
                }}
              />
              {formik.touched.AppointmentDate &&
                formik.errors.AppointmentDate && (
                  <div className="error">{formik.errors.AppointmentDate}</div>
                )}
            </div>
          </div>
          <div className="field-label">
            <div className="input-group">
              <BiSolidTime className="input-icon" />
              <input
                type={isMobile ? "time" : "text"}
                id="AppointmentTime"
                name="AppointmentTime"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.AppointmentTime}
                placeholder="Time"
                className="field"
                onFocus={() => {
                  setshowCalendar(false);
                  setshowTime(true);
                }}
              />
              {formik.touched.AppointmentTime &&
                formik.errors.AppointmentTime && (
                  <div className="error">{formik.errors.AppointmentTime}</div>
                )}
            </div>
          </div>

          <button
            type="submit"
            onClick={() => {
              formik.handleSubmit();
              setFormStage(1);
            }}
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  function userSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <g clipPath="url(#clip0_46_8794)">
          <rect
            width="22"
            height="22"
            rx="11"
            fill="#002433"
            fillOpacity="0.1"
          />
          <circle cx="10.9697" cy="9.62123" r="3.51515" fill="#002433" />
          <circle cx="10.75" cy="22.1439" r="7.25" fill="#002433" />
        </g>
        <defs>
          <clipPath id="clip0_46_8794">
            <rect width="22" height="22" rx="11" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  function InformationComponent(
    title: string,
    definition: string,
    idx1: number,
    idx2: number
  ) {
    return (
      <div className="content-1">
        {idx1 <= idx2 ? (
          <BsCheckCircleFill fontSize={18} color="rgba(19, 21, 34, 1)" />
        ) : (
          <BsCheckCircle fontSize={18} color="rgba(19, 21, 34, 1)" />
        )}
        <div className="content-2">
          <span style={{ color: "black" }}>{title}</span>
          <br />
          <span style={{ color: "rgba(161, 165, 168, 0.9)" }}>
            {formStage > 0 && idx1 === 0 ? (
              <div className="dtime">
                <span>{formik.values.AppointmentDate}</span>
                <br />
                <span>{formik.values.AppointmentTime}</span>
              </div>
            ) : (
              definition
            )}
          </span>
        </div>
      </div>
    );
  }
};
