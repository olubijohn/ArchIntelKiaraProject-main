import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { UserDashboard } from "./UserDashboard/UserDashboard";
import { Login } from "./AuthScreens/Login";
import { SignUp } from "./AuthScreens/SignUp/SignUp";
import * as routes from "./Data/Routes";
import { Appointment } from "./BookingAppointment/Appointment";
import { ForgotPassword } from "./AuthScreens/ForgotPassword/ForgotPassword";
import { AvailableDoctor } from "./AvailableDoctor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.homepage} index element={<Login />} />
          <Route path={routes.signup} index element={<SignUp />} />
          <Route path={routes.dashboard} index element={<UserDashboard />} />
          <Route path={routes.appointment} index element={<Appointment />} />
          <Route path={routes.f_password} index element={<ForgotPassword />} />
          <Route
            path={routes.availableDoctors}
            index
            element={<AvailableDoctor />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
