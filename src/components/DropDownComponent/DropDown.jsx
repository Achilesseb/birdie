import ButtonComponent from "../ButtonComponent";
import useLogOut from "../../customHooks/useLogout";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const logout = useLogOut();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="align absolute z-30 h-full w-full bg-white p-11 ">
      <ButtonComponent
        type="primary"
        modifier="opacity-100"
        callback={handleLogOut}
      >
        Log out
      </ButtonComponent>
    </div>
  );
};
export default DropDown;
