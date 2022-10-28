import { supabase } from "../index";

export const addLeadingZeros = (num, length) => {
  return String(num).padStart(length, "0");
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};

export const fetchMessagesCount = async (params) => {
  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("chatID", `${params.id}`);
  return count;
};

export const fetchMessages = async (params, range, messageCount) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chatID", `${params.id}`)
    .order("created_at", { ascending: true });
  // .range(bottomLimit, topLimit);

  return data;
  // }
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
  messageToSend,
  receiverUser
) => {
  if (e.key === "Enter" || e.type === "click") {
    if (e.target.value !== "") {
      await supabase.from("messages").insert({
        chatID: params.id,
        text: messageToSend,
        sender: user.id,
        receiver: receiverUser.id,
        created_at: new Date().toISOString().toLocaleString("ro-RO"),
      });
    }

    e.target.value = "";
  }
};
export const fetchUserFriendListIds = async (uuid) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("friend_list")
    .eq("id", uuid);
  return data[0].friend_list;
};

export const fetchUserFriendListData = async (ids) => {
  const datas = await Promise.all(ids.map(getData));
  return datas;
};

const getData = async (id) => {
  const { data } = await supabase.from("profiles").select("*").eq("id", id);
  return await data;
};
