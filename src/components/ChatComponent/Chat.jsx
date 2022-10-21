import { useEffect, useRef, useState } from "react";
import { supabase } from "../../index";
import victorImage from "../../img/victor.jpg";
import { addLeadingZeros } from "../../utils/helperFunctions";
import { useParams } from "react-router-dom";

const Chat = ({ user }) => {
  const messagesEndRef = useRef(null);
  const params = useParams();
  const [messages, setMessages] = useState(null);
  const [session, setSession] = useState(null);
  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", params.id);

    setMessages(data);
  };
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data);
  };
  supabase
    .channel("*")
    .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
      fetchMessages();
    })
    .subscribe();
  const initilizeChat = () => {
    fetchMessages();
    getSession();
  };
  useEffect(() => {
    initilizeChat();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
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
      <div class="b flex h-[80%] max-h-[80%] w-full flex-col gap-4 overflow-hidden overflow-y-scroll">
        {messages !== null &&
          messages.length > 0 &&
          messages.map((message) =>
            message.sender === session.session.user.id ? (
              <div class="flex h-auto w-full items-start" key={message.id}>
                <div class="h-full w-[10%] rounded-full bg-white">
                  <img
                    class="rounded-full"
                    src={
                      session.session.user.identities?.[0].identity_data
                        ?.avatar_url
                    }
                    alt="user"
                  />
                </div>
                <div class="h-full w-[70%] rounded-xl bg-red-400 p-2 text-white">
                  {message.text}
                </div>
              </div>
            ) : (
              <div
                class="flex h-auto w-full flex-row-reverse justify-start"
                key={message.id}
              >
                <div class="h-full w-[10%] rounded-full bg-slate-500"></div>
                <div class=" h-full w-[70%] rounded-xl bg-slate-500 p-2 text-white">
                  {message.text}
                </div>
              </div>
            )
          )}
        <div ref={messagesEndRef} />
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
                chat_id: params.id,
                text: e.target.value,
                sender: user.id,
              });

              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
export default Chat;
