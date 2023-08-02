import * as routes from "../../Data/Routes";
import { useNavigate } from "react-router-dom";

export const Congratulation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Congratulation</h2>
      <span>You have successfully signed up. </span>
      <br />
      <button
        type="submit"
        className="congrat-btn"
        onClick={() => navigate(routes.dashboard)}
      >
        Go to dashboard
      </button>
    </div>
  );
};
