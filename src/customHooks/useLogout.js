import { supabase } from "../index";

export const useLogout = () => {
  const logout = async () => supabase.auth.signOut();
  return logout;
};
