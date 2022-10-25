import { supabase } from "../index";

const useLogout = () => {
  const logout = async () => await supabase.auth.signOut();
  return logout;
};

export default useLogout;
