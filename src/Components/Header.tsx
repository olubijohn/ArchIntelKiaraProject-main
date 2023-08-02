import { useNavigate } from "react-router-dom";
import kiara from "../Images/kiara1.png";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import * as routes from "../Data/Routes";

export const Header = () => {
  const navigate = useNavigate();
  const [showNav, setshowNav] = useState<boolean>(false);
  return (
    <div className="signin">
      <img
        src={kiara}
        alt="kiara"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(routes.homepage)}
      />
      <div className="inner">
        <span>
          <a
            href={`https://www.kiarafamilypractice.com.au/`}
            target="_blank"
            rel="noreferrer"
          >
            Home
          </a>
        </span>
        <span>
          <a
            href={`https://www.kiarafamilypractice.com.au/services/`}
            target="_blank"
            rel="noreferrer"
          >
            Services
          </a>
        </span>
        <span>
          <a
            href={`https://www.kiarafamilypractice.com.au/about/`}
            target="_blank"
            rel="noreferrer"
          >
            About Us
          </a>
        </span>
        <span>
          <a
            href={`https://www.kiarafamilypractice.com.au/fees/`}
            target="_blank"
            rel="noreferrer"
          >
            Fees
          </a>
        </span>
      </div>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <FaBars onClick={() => setshowNav(!showNav)} />
      {showNav && (
        <div className="xsNav">
          <div>
            <a
              href={`https://www.kiarafamilypractice.com.au/`}
              target="_blank"
              rel="noreferrer"
            >
              Home
            </a>
          </div>
          <div>
            <a
              href={`https://www.kiarafamilypractice.com.au/about/`}
              target="_blank"
              rel="noreferrer"
            >
              About Us
            </a>
          </div>
          <div>
            <a
              href={`https://www.kiarafamilypractice.com.au/services/`}
              target="_blank"
              rel="noreferrer"
            >
              Services
            </a>
          </div>
          <div>
            <a
              href={`https://www.kiarafamilypractice.com.au/fees/`}
              target="_blank"
              rel="noreferrer"
            >
              Fees
            </a>
          </div>
          <div onClick={() => navigate("/signup")}>Sign up</div>
        </div>
      )}
    </div>
  );
};
