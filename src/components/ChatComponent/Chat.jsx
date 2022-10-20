import { useEffect, useState } from "react";
import { supabase } from "../../index";
import { addLeadingZeros } from "../../utils/helperFunctions";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState(null);
  const fetchMessages = async () => {
    const { data } = await supabase.from("messages").select("*");
    setMessages(data);
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div>
      {messages !== null &&
        messages.length > 0 &&
        messages.map((message) => <div>{message.text}</div>)}
      <div>
        <input
          type="text"
          onKeyPress={async (e) => {
            if (e.key === "Enter") {
              await supabase.from("messages").insert({
                id: addLeadingZeros(messages.length + 1, 8),
                text: e.target.value,
                sender: user.id,
              });
              e.target.value = "";
              fetchMessages();
            }
          }}
        />
      </div>
    </div>
  );
};
export default Chat;
