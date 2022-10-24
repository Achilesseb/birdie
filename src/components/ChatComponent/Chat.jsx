import { useEffect, useRef, useState } from "react";
import { supabase } from "../../index";
import defaultUserImage from "../../img/default.jpg";
import { useLocation, useParams } from "react-router-dom";
import {
  IoCameraOutline,
  IoChevronBackCircleSharp,
  IoSendOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { handleSubmitMessage } from "../../utils/helperFunctions";

const Chat = ({ user }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const params = useParams();
  const [messages, setMessages] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [session, setSession] = useState(null);
  const receiverUser = state.receiver[0];
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
    <div className="h-full w-full bg-inside-circle">
      <div className="flex h-[10%] w-full items-center justify-between px-4">
        <IoChevronBackCircleSharp
          size="70%"
          className="w-10"
          onClick={(e) => navigate("/home")}
        />
        <div className="flex h-[70%] w-full items-center justify-center">
          <img
            className="mx-4 aspect-square h-[50%] rounded-full"
            src={receiverUser?.avatar_url}
            referrerPolicy="no-referrer"
            alt="receiverUser"
          ></img>
          <span>{receiverUser?.username}</span>
        </div>
        <div>
          <IoCameraOutline size="70%" className="w-10" />
        </div>
      </div>
      <div className="b flex h-[80%] max-h-[80%] w-full flex-col gap-4 overflow-hidden overflow-y-scroll">
        {messages !== null &&
          messages.length > 0 &&
          messages.map((message) =>
            message.sender === session.session.user.id ? (
              <div className="flex h-auto w-full items-start" key={message.id}>
                <div className="h-full w-[10%] rounded-full bg-white">
                  <img
                    className="rounded-full"
                    src={
                      session.session.user.identities?.[0].identity_data
                        ?.avatar_url || defaultUserImage
                    }
                    referrerPolicy="no-referrer"
                    alt="user"
                  />
                </div>
                <div className="h-full w-[70%] rounded-xl bg-red-400 p-2 text-white">
                  {message.text}
                </div>
              </div>
            ) : (
              <div
                className="flex h-auto w-full flex-row-reverse justify-start"
                key={message.id}
              >
                <div className="h-full w-[10%] rounded-full bg-slate-500">
                  <img
                    className="rounded-full"
                    src={receiverUser?.avatar_url}
                    referrerPolicy="no-referrer"
                    alt="user"
                  />
                </div>
                <div className=" h-full w-[70%] rounded-xl bg-slate-500 p-2 text-white">
                  {message.text}
                </div>
              </div>
            )
          )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex h-[10%] w-full items-center justify-center ">
        <IoSendOutline
          color="white"
          size="30px"
          className="mr-2"
          onClick={(e) =>
            handleSubmitMessage(e, params, user, messages, messageToSend)
          }
        />
        <input
          className="h-[50%] w-[80%] rounded-md px-5"
          placeholder="Type your message here.."
          type="text"
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyPress={(e) =>
            handleSubmitMessage(e, params, user, messages, messageToSend)
          }
        />
      </div>
    </div>
  );
};
export default Chat;
