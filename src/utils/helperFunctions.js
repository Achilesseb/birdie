import { supabase } from "../index";
export const addLeadingZeros = (num, length) => {
  return String(num).padStart(length, "0");
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
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
      await supabase.from("messages").insert({
        id: `${params.id}0${messages.length + 1}`,
        chat_id: params.id,
        text: messageToSend,
        sender: user.id,
      });
    }
    e.target.value = "";
  }
};
