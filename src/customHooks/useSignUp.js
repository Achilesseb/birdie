import { useState } from "react";
import { supabase } from "../index";
export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const signup = async () => {
    try {
      if (loginPassword !== passwordConfirm) return;
      //   const { data } = await supabase.from("auth");
      //   console.log(data);
      //   for (let i = 0; i < data.length; i++) {
      //     if (data[i].username === username || data[i].email === email)
      //       throw new Error("User already exists!");
      //   }
      await supabase.auth.signUp({
        email: email,
        password: loginPassword,
        options: {
          data: {
            username,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    setUsername,
    setLoginPassword,
    setPasswordConfirm,
    setEmail,
    signup,
  };
};
