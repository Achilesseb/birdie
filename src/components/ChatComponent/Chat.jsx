import { useEffect, useState } from "react";
import { supabase } from "../../index";
import victorImage from "../../img/victor.jpg";
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
    <div class="h-full w-full bg-inside-circle">
      <div class="flex h-[10%] w-full justify-between">
        <button>Back</button>
        <div>
          <img
            class="aspect-square h-[50%] rounded-full"
            src={victorImage}
          ></img>
          <span>victorprisacariu</span>
        </div>
      </div>
      <div class="b flex h-[80%] w-full flex-col gap-4">
        {messages !== null &&
          messages.length > 0 &&
          messages.map((message) => (
            <div class="flex h-auto w-full ">
              <div class="h-full w-[10%] bg-white"></div>
              <div class=" h-full w-[70%] rounded-xl bg-white p-2">
                {message.text}
              </div>
            </div>
          ))}
      </div>
      <div class="flex h-[10%] w-full items-center justify-center ">
        <input
          class="h-[50%] w-[80%] rounded-md px-5"
          placeholder="Type your message here.."
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
