import kiara from "../../Images/kiara1bg.png";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { YourDetails } from "./YourDetails";
import { ContactDetails } from "./ContactDetails";
import { useState } from "react";
import { MedicalInfo } from "./MedicalInfo";
import { SigninDetails } from "./SignUpDetails";
import { Congratulation } from "./Congratulation";
import { useNavigate } from "react-router-dom";
import * as routes from "../../Data/Routes";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formStage, setFormStage] = useState<number>(0);
  const switchFormStage = (index: number) => {
    setFormStage(index);
  };

  return (
    <div className="signup-component">
      <div className="signup-header">
        <img
          src={kiara}
          alt="kiara"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(routes.homepage)}
        />
        <button className="login-btn" onClick={() => navigate(routes.homepage)}>
          Log in
        </button>
      </div>
      <div className="grid-container">
        <div className="left-grid">
          <img
            src={kiara}
            alt="kiara"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(routes.homepage)}
          />
          <div className="content">
            {InformationComponent(
              "Your details",
              "Provide your personal details",
              0,
              formStage
            )}
            {InformationComponent(
              "Contact details",
              "Provide your contact information",
              1,
              formStage
            )}
            {InformationComponent(
              "Medical information",
              "Provide your medicare information",
              2,
              formStage
            )}
            {InformationComponent(
              "Create sign in details",
              "Create your username and password",
              3,
              formStage
            )}
          </div>
        </div>
        <div className="right-grid">
          <button
            className="login-btn"
            onClick={() => navigate(routes.homepage)}
          >
            Log in
          </button>
          <div className="form">
            {formStage < 4 && (
              <>
                <h1>Patient Sign up</h1>
                <div className="span">Sign up for free</div>
                <div className="xsFormStage">
                  {formStage >= 0 ? (
                    <BsCheckCircleFill
                      fontSize={20}
                      color="rgba(19, 21, 34, 1)"
                    />
                  ) : (
                    <div>1</div>
                  )}
                  {formStage >= 1 ? (
                    <BsCheckCircleFill
                      fontSize={20}
                      color="rgba(19, 21, 34, 1)"
                    />
                  ) : (
                    <div>2</div>
                  )}
                  {formStage >= 2 ? (
                    <BsCheckCircleFill
                      fontSize={20}
                      color="rgba(19, 21, 34, 1)"
                    />
                  ) : (
                    <div>3</div>
                  )}
                  {formStage >= 3 ? (
                    <BsCheckCircleFill
                      fontSize={20}
                      color="rgba(19, 21, 34, 1)"
                    />
                  ) : (
                    <div>4</div>
                  )}
                </div>
              </>
            )}
            {formStage === 0 ? (
              <YourDetails switchFormStage={switchFormStage} />
            ) : formStage === 1 ? (
              <ContactDetails switchFormStage={switchFormStage} />
            ) : formStage === 2 ? (
              <MedicalInfo switchFormStage={switchFormStage} />
            ) : formStage === 3 ? (
              <SigninDetails switchFormStage={switchFormStage} />
            ) : (
              <Congratulation />
            )}
          </div>
        </div>
      </div>
    </div>
  );

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
            {definition}
          </span>
        </div>
      </div>
    );
  }
};
