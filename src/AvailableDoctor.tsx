import { useState } from "react";
import kiara from "./Images/kiara1.png";
import { FaBars } from "react-icons/fa";
import * as routes from "./Data/Routes";
import { useNavigate } from "react-router-dom";
import nurse from "./Images/nurse_doctor.png";
import nurse2 from "./Images/nurse2.png";

export const AvailableDoctor = () => {
  const navigate = useNavigate();
  const [showNav, setshowNav] = useState<boolean>(false);

  const doctors = [
    {
      Image: nurse,
      Name: "Mrs Adeniyi Felicia",
      Qualification:
        "Practice nurse B.Sc Nursing,Cert Mangt OND,HND Agric Mech",
    },
    {
      Image: nurse2,
      Name: "Dr Adeniyi Gabriel",
      Qualification:
        "Principal doctor MBBS, FWACS,FRCSEd, AMC,FRACGP ,FWACS, FRCSEd, AMC, FRACGP",
    },
    {
      Image: nurse,
      Name: "Dr Adeniyi Gabriel",
      Qualification:
        "Principal doctor MBBS, FWACS,FRCSEd, AMC,FRACGP ,FWACS, FRCSEd, AMC, FRACGP",
    },
    {
      Image: nurse,
      Name: "Mrs Adeniyi Felicia",
      Qualification:
        "Practice nurse B.Sc Nursing,Cert Mangt OND,HND Agric Mech",
    },
    {
      Image: nurse2,
      Name: "Dr Adeniyi Gabriel",
      Qualification:
        "Principal doctor MBBS, FWACS,FRCSEd, AMC,FRACGP ,FWACS, FRCSEd, AMC, FRACGP",
    },
    {
      Image: nurse,
      Name: "Dr Adeniyi Gabriel",
      Qualification:
        "Principal doctor MBBS, FWACS,FRCSEd, AMC,FRACGP ,FWACS, FRCSEd, AMC, FRACGP",
    },
  ];

  const gotoAppointment = () => {
    navigate(routes.appointment);
    localStorage.setItem("selected_doctor", JSON.stringify({}));
  };

  return (
    <div className="available-doctors">
      <div className="header">
        <img
          src={kiara}
          alt="kiara"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(routes.homepage)}
        />
        <div className="lgNav">
          <button onClick={() => navigate(routes.homepage)}>Log in</button>
          <button onClick={() => navigate(routes.signup)}>Sign Up</button>
        </div>
        <FaBars onClick={() => setshowNav(!showNav)} />
        {showNav && (
          <div className="xsNav">
            <div onClick={() => navigate(routes.homepage)}>Log in</div>
            <div onClick={() => navigate(routes.signup)}>Sign up</div>
          </div>
        )}
      </div>

      <div className="doctor-search">
        <h3>Available Docotors</h3>
        <div className="search-input">
          {SearchIcon()}
          <input
            type="text"
            placeholder="Search for a doctor"
            className="search-doctors"
          />
        </div>
        <div className="search-results">
          {doctors.map((doctor, index: number) => (
            <div className="doctor" key={index}>
              <img src={doctor.Image} alt="nurse-1" />
              <div className="doctor-text">
                <div className="name">{doctor.Name}</div>
                <div className="degrees">{doctor.Qualification}</div>
                <button onClick={gotoAppointment}>Schedule appointment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function SearchIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.31 15.9L20.71 19.29C20.8993 19.4778 21.0058 19.7334 21.0058 20C21.0058 20.2666 20.8993 20.5222 20.71 20.71C20.5222 20.8993 20.2666 21.0058 20 21.0058C19.7334 21.0058 19.4778 20.8993 19.29 20.71L15.9 17.31C14.5025 18.407 12.7767 19.0022 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19.0022 12.7767 18.407 14.5025 17.31 15.9ZM11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5Z"
          fill="#919EAB"
        />
      </svg>
    );
  }
};
