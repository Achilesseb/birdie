import { useState } from "react";
import { supabase } from "../index";
import defaultAvatar from "../img/default.jpg";

export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const signup = async () => {
    console.log(email, loginPassword);
    try {
      if (loginPassword !== passwordConfirm)
        return alert("Passwords don`t match!");
      await supabase.auth.signUp({
        email: email,
        password: loginPassword,
        options: {
          data: {
            username: username,
            email: email.at,
            avatar_url: defaultAvatar,
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
