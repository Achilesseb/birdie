import ButtonComponent from "../ButtonComponent";
import useLogOut from "../../customHooks/useLogout";
import { useNavigate } from "react-router-dom";

const DropDown = ({ userId }) => {
  const logout = useLogOut();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="absolute top-0 z-30 flex h-[50%] w-full flex-col gap-4 bg-white">
      <div className="flex h-full w-full flex-col items-center justify-between gap-8 bg-inside-circle p-10">
        <div className=" flex w-[60%] items-center justify-start">
          <svg viewBox="0 0 1024 1024" className="home-icon2">
            <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
          </svg>
          <span className="home-text3">Profile</span>
        </div>
        <div className="flex w-[60%] items-center justify-start">
          <svg viewBox="0 0 1152 1024" className="home-icon4">
            <path d="M1088 901.166c0 45.5 26.028 84.908 64 104.184v15.938c-10.626 1.454-21.472 2.224-32.5 2.224-68.008 0-129.348-28.528-172.722-74.264-26.222 6.982-54.002 10.752-82.778 10.752-159.058 0-288-114.616-288-256s128.942-256 288-256c159.058 0 288 114.616 288 256 0 55.348-19.764 106.592-53.356 148.466-6.824 14.824-10.644 31.312-10.644 48.7zM512 0c278.458 0 504.992 180.614 511.836 405.52-49.182-21.92-103.586-33.52-159.836-33.52-95.56 0-185.816 33.446-254.138 94.178-70.846 62.972-109.862 147.434-109.862 237.822 0 44.672 9.544 87.888 27.736 127.788-5.228 0.126-10.468 0.212-15.736 0.212-27.156 0-53.81-1.734-79.824-5.044-109.978 109.978-241.25 129.7-368.176 132.596v-26.916c68.536-33.578 128-94.74 128-164.636 0-9.754-0.758-19.33-2.164-28.696-115.796-76.264-189.836-192.754-189.836-323.304 0-229.75 229.23-416 512-416z"></path>
          </svg>
          <span className="home-text4">Chats</span>
        </div>
        <div
          className="flex w-[60%] items-center justify-start"
          onClick={() => navigate(`/user/${userId}/people`)}
        >
          <svg viewBox="0 0 1024 1024" className="home-icon6">
            <path d="M384 554q64 0 140 18t139 60 63 94v128h-684v-128q0-52 63-94t139-60 140-18zM640 512q-26 0-56-10 56-66 56-160 0-38-16-86t-40-76q30-10 56-10 70 0 120 51t50 121-50 120-120 50zM214 342q0-70 50-121t120-51 120 51 50 121-50 120-120 50-120-50-50-120zM712 560q106 16 188 59t82 107v128h-172v-128q0-98-98-166z"></path>
          </svg>
          <span className="home-text5">People</span>
        </div>
        <ButtonComponent
          type="primary"
          modifier="opacity-100"
          callback={handleLogOut}
        >
          Log out
        </ButtonComponent>
      </div>
    </div>
  );
};
export default DropDown;
