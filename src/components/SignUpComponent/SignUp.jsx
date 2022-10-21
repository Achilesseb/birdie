import birdieLogo from "../../img/birdie-icon.png";
import { useSignUp } from "../../customHooks/useSignUp";
import {
  RiLockPasswordFill,
  RiAccountCircleFill,
  RiLockPasswordLine,
  RiMailAddFill,
} from "react-icons/ri";
import ButtonComponent from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const {
    setUsername,
    setEmail,
    setLoginPassword,
    setPasswordConfirm,
    signup,
  } = useSignUp();

  return (
    <div class="relative flex h-full w-full bg-white">
      <div class="absolute top-[-35vh] left-[-25vw] z-10 h-[50vh] w-[100%] scale-[1.5] rounded-full bg-outside-circle "></div>
      <div class="absolute left-[-20vw] top-[15vh] z-0 h-[200px] w-[200px] rounded-full bg-inside-circle"></div>
      <div class="absolute top-[45vh] left-[20vw] z-0 h-[220px] w-[220px] rounded-full bg-inside-circle"></div>
      <div class="absolute left-[75vw] top-[85vh] z-0 h-[200px] w-[200px] rounded-full bg-inside-circle"></div>
      <div id="toggle_form_container">
        <img
          id="main"
          src={birdieLogo}
          alt="birdie"
          class="absolute top-[5vh]  z-10 h-[12vh]"
        />
        <span class="absolute left-[40vw] top-[7vh] z-10 font-serif text-[1.5rem]  font-semibold tracking-widest text-white">
          Birdie
        </span>
        <span class="absolute left-[30vw] top-[12vh] z-10 font-serif text-[0.8rem]  font-semibold tracking-widest text-slate-600">
          Fly by your messages!
        </span>
      </div>
      <div class="row-span-2 mt-[35vh]  grid h-[65vh] w-full">
        <form class=" flex h-full w-full flex-col items-center justify-evenly ">
          <div class="relative h-[50px] w-[350px] opacity-90">
            <RiAccountCircleFill class="absolute ml-1 h-full" size="30px" />
            <input
              class="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue pl-[40px]  text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="relative h-[50px] w-[350px] opacity-90">
            <RiMailAddFill class="absolute ml-1 h-full" size="30px" />
            <input
              class="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue pl-[40px]  text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="text"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="relative h-[50px] w-[350px] opacity-90">
            <RiLockPasswordFill class="absolute ml-1 h-full" size="30px" />
            <input
              class="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue  pl-[40px] text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div class="relative h-[50px] w-[350px] opacity-90">
            <RiLockPasswordLine class="absolute ml-1 h-full" size="30px" />
            <input
              class="h-full w-full rounded-md border-b-2 border-r-2 border-border-blue  pl-[40px] text-[1.2rem] outline-none focus:border-border-green focus:shadow-lg focus:shadow-border-blue  focus:outline-none "
              type="password"
              required
              placeholder="Confirm password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        </form>
        <div class="mb-12 flex flex-col items-center justify-evenly">
          <ButtonComponent type="primary" modifiers="z-20" callback={signup}>
            Sign up
          </ButtonComponent>
          <a
            class="absolute bottom-0 font-semibold text-slate-600 opacity-80"
            href="/login"
          >
            Already have an account?{" "}
            <span class="font-bold text-green-600">Log In</span>!
          </a>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;
