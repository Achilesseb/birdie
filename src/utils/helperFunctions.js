import { supabase } from "../index";
export const addLeadingZeros = (num, length) => {
  return String(num).padStart(length, "0");
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};
export const fetchMessages = async (params, range) => {
  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact" });
  const bottomLimit =
    count - (range + 1) * 30 > 0 ? count - (range + 1) * 30 : 0;

  if (bottomLimit >= 0) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chatID", `${params.id}`)
      .order("created_at", { ascending: true })
      .range(bottomLimit, count - 30 * range - 1);
    return { data, count };
  }
};

export const fetchCurrentUserChats = async (userId) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*, messages(*)")
    .contains("users", [`${userId}`])
    .order("created_at", { ascending: true });
  return data;
};

export const handleSubmitMessage = async (
  e,
  params,
  user,
  messages,
  messageToSend
) => {
  if (e.key === "Enter" || e.type === "click") {
    if (e.target.value !== "") {
      const { data, error } = await supabase.from("messages").insert({
        chatID: params.id,
        text: messageToSend,
        sender: user.id,
        created_at: new Date().toISOString().toLocaleString("ro-RO"),
      });
    }
    e.target.value = "";
  }
};
