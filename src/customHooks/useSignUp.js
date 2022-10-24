import { useState } from "react";
import { supabase } from "../index";
import defaultAvatar from "../img/default.jpg";
export const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const signup = async () => {
    try {
      if (loginPassword !== passwordConfirm) return;
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: loginPassword,
      });

      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        username: username,
        is_verified: false,
        avatar_url: defaultAvatar,
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
