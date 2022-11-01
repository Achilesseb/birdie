import googleLogo from "../../img/google-icon.png";
import facebookLogo from "../../img/facebook-icon.png";
import githubLogo from "../../img/github-icon.png";
import birdieLogo from "../../img/birdie-icon.png";
import { RiLockPasswordFill, RiAccountCircleFill } from "react-icons/ri";
import ButtonComponent from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
import useLogin from "../../customHooks/useLogin";
import { useState } from "react";
import Error from "../ErrorComponent";
const LoginForm = () => {
  const { login, error, isPending, setLoginPassword, setEmail } = useLogin();
  const [loginErrorStatus, setLoginErrorStatus] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    await login();
    if (error !== null) navigate("/home");
    else setLoginErrorStatus(true);
  };

  return (
    <div className="relative flex h-full w-full bg-white">
      <div className="absolute top-[-35vh] left-[-25vw] z-10 h-[50vh] w-[100%] scale-[1.5] rounded-full bg-outside-circle "></div>
      <div className="absolute left-[-20vw] top-[15vh] z-0 h-[200px] w-[200px] rounded-full bg-inside-circle"></div>
      <div className="absolute top-[45vh] left-[20vw] z-0 h-[220px] w-[220px] rounded-full bg-inside-circle"></div>
      <div className="absolute left-[75vw] top-[85vh] z-0 h-[200px] w-[200px] rounded-full bg-inside-circle"></div>
      <div id="toggle_form_container">
        <img
          id="main"
          src={birdieLogo}
          alt="birdie"
          className="absolute top-[5vh]  z-10 h-[12vh]"
        />
        <span className="absolute left-[40vw] top-[7vh] z-10 font-serif text-[1.5rem]  font-semibold tracking-widest text-white">
          Birdie
        </span>
        <span className="absolute left-[30vw] top-[12vh] z-10 font-serif text-[0.8rem]  font-semibold tracking-widest text-slate-600">
          Fly by your messages!
        </span>
      </div>
      <div className="row-span-2 mt-[35vh]  grid h-[65vh] w-full">
        <form className=" flex h-full w-full flex-col items-center justify-evenly ">
          <div className="relative h-[50px] w-[350px] opacity-90">
            <RiAccountCircleFill className="absolute ml-1 h-full" size="30px" />
            <input
              className="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue pl-[40px]  text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="text"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative h-[50px] w-[350px] opacity-90">
            <RiLockPasswordFill className="absolute ml-1 h-full" size="30px" />
            <input
              className="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue  pl-[40px] text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {loginErrorStatus === true ? <Error error={error} /> : null}
        </form>
        <div className="mb-12 flex flex-col items-center justify-evenly">
          <ButtonComponent
            type="primary"
            modifiers="z-20"
            callback={handleLoginClick}
          >
            Log in
          </ButtonComponent>
          <span className="font-semibold text-slate-600 opacity-80">
            or continue with
          </span>
          <div className="flex justify-evenly align-middle">
            <img
              src={googleLogo}
              alt="google"
              className="h-16"
              onClick={() => login("google")}
            />
            <img
              src={facebookLogo}
              alt="facebook"
              className="h-16"
              onClick={() => login("facebook")}
            />
            <img
              src={githubLogo}
              alt="github"
              className="h-14"
              onClick={() => login("github")}
            />
          </div>
          <a
            className="absolute bottom-0 font-semibold text-slate-600 opacity-80"
            href="/signup"
          >
            No account?{" "}
            <span className="font-bold text-green-600">SIGN UP</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
