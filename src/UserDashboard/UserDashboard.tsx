import { useNavigate } from "react-router-dom";
import kiara from "../Images/kiara1bg.png";
import nurse from "../Images/nurse_doctor.png";
import nurse2 from "../Images/nurse2.png";
import Table from "./Table";
import { useState } from "react";
import * as routes from "../Data/Routes";
import { ISelectedDoctor } from "../Interface/ISelectedDoctor";
import { FaBars } from "react-icons/fa";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState<boolean>(false);
  const appointments = [
    {
      Name: "Mrs Adeniyi Felicia",
      IsEmergency: "Emergency",
      Datetime: "5 February 2022 12:00PM -1:00PM",
    },
    {
      Name: "Mrs Adeniyi Felicia",
      IsEmergency: "Emergency",
      Datetime: "5 February 2022 12:00PM -1:00PM",
    },
  ];

  const doctors: ISelectedDoctor[] = [
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
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const SelectedDoctor = (values: ISelectedDoctor) => {
    localStorage.setItem("selected_doctor", JSON.stringify(values));
    navigate(routes.appointment);
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <img
          src={kiara}
          alt="kiara"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(routes.homepage)}
        />
        <div className="nav">
          <span className="contact-us">Contact us</span>
          <div className="user">
            {userSVG()}
            {/* <span>Olalekan Ayodeji</span> */}
            {/* <IoIosArrowDown style={{ margin: "4px 0px 0px 12px" }} /> */}
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ border: "0px solid" }}
            >
              <option value="">Olalekan Ayodeji</option>
              <option value="profile">Profile</option>
              <option value="logout">Log out</option>
            </select>
          </div>
        </div>
        <FaBars onClick={() => setShowNav(!showNav)} />
        {showNav && (
          <div className="xsNav">
            <div>Profile</div>
            <div>Log out</div>
          </div>
        )}
      </div>
      <div className="dashboard">
        <div className="left-grid">
          <h3>Upcoming appointments</h3>
          <div className="upcoming">
            {appointments.map((appointment, index) => (
              <div className="appointment" key={index}>
                <img src={nurse} alt="nurse" />
                <div className="apt-text">
                  <div>{appointment.Name}</div>
                  <div>{appointment.IsEmergency}</div>
                  <div>{appointment.Datetime}</div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="history">Appointment history</h3>
          <Table />
        </div>
        <div className="right-grid">
          <h3>Available Docotors</h3>
          <input
            type="text"
            placeholder="Search for a doctor"
            className="search-doctors"
            onFocus={() => navigate(routes.availableDoctors)}
          />
          <div className="search-results">
            {doctors.map((doctor, index) => (
              <div className="doctor" key={index}>
                <img src={doctor.Image} alt="nurse-1" />
                <div className="doctor-text">
                  <div className="name">{doctor.Name}</div>
                  <div className="degrees">{doctor.Qualification}</div>
                  <button onClick={() => SelectedDoctor(doctor)}>
                    Schedule appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
};
