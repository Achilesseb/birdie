import { useEffect } from "react";
import { useState } from "react";
const Error = ({ error }) => {
  const [message, setMessage] = useState(null);
  const createErrorMessage = () => {
    if (error.message.includes("Invalid login credentials"))
      setMessage(
        "🚫 Sorry, your username and password are incorrect - Please try again!"
      );
  };
  useEffect(() => {
    createErrorMessage();
  }, []);

  console.log(error);

  return (
    <div className="z-50 h-auto w-[90%] rounded-full bg-red-200 px-4">
      <span className="text-black">{message}</span>
    </div>
  );
};
export default Error;
