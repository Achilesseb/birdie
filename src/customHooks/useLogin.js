import { useState } from "react";
import { supabase } from "../index";
const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const login = async (provider) => {
    setError(null);
    setIsPending(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:3000/home",
        },
      });
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};

export default useLogin;
