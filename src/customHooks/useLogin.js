import { useState } from "react";
import { supabase } from "../index";
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const login = async (provider) => {
    setError(null);
    setIsPending(true);
    console.log("login ....");
    try {
      await supabase.auth.signOut();
      if (provider) {
        await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: "http://localhost:3000/home",
          },
        });
      } else if (email && loginPassword) {
        await supabase.auth.signInWithPassword({
          email: email,
          password: loginPassword,
        });
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending, setLoginPassword, setEmail };
};

export default useLogin;
