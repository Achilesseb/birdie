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
import { getSession, fetchMessages } from "../../utils/helperFunctions";

const Chat = ({ user }) => {
  const channel = supabase.channel("db-messages");
  const receiverUser = useLocation().state.receiver[0];
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);
  const messagesIntermediateRef = useRef(null);
  const params = useParams();
  const [messages, setMessages] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [session, setSession] = useState(null);
  const [rangeLimitter, setRangeLimitter] = useState(0);
  const [newMessageTrigger, setNewMessageTrigger] = useState(true);
  const [messageCount, setMessageCount] = useState(null);

  channel
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chatID=eq.${params.id}`,
      },
      (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
        setNewMessageTrigger(true);
      }
    )
    .subscribe();

  const initilizeChat = async () => {
    const { data } = await fetchMessages(params, rangeLimitter);
    setMessages(data);
    setSession(await getSession());
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  };
  const fillChatWithOlderMessages = async () => {
    const { data: olderMessages, count } = await fetchMessages(
      params,
      rangeLimitter
    );
    setMessageCount(count);
    if (olderMessages) {
      setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
      setNewMessageTrigger(false);
      setTimeout(() => {
        messagesIntermediateRef.current?.scrollIntoView({
          behaviour: "smooth",
          block: "end",
        });
      }, 100);
    }
  };
  const onScroll = () => {
    if (messageCount !== messages.length)
      if (messagesStartRef.current) {
        const { scrollTop } = messagesStartRef.current;
        if (scrollTop === 0) {
          setRangeLimitter(rangeLimitter + 1);
        }
      }
  };

  useEffect(() => {
    initilizeChat();
    return setRangeLimitter(0);
  }, []);

  useEffect(() => {
    if (newMessageTrigger === true) {
      messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
      setNewMessageTrigger(false);
    }
  }, [newMessageTrigger]);

  useEffect(() => {
    if (rangeLimitter > 0) fillChatWithOlderMessages();
  }, [rangeLimitter]);

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
      <div
        className="b flex h-[80%] max-h-[80%] w-full flex-col gap-4 overflow-hidden overflow-y-scroll"
        onScroll={onScroll}
        ref={messagesStartRef}
      >
        <div>salut</div>
        {messages !== null &&
          messages.length > 0 &&
          messages.map((message, index) =>
            message.sender === session.session.user.id ? (
              <div
                className="flex h-auto w-full items-start"
                key={message.id}
                ref={messagesIntermediateRef}
              >
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
                ref={messagesIntermediateRef}
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
          onKeyDown={(e) =>
            e.key === "Enter"
              ? handleSubmitMessage(e, params, user, messages, messageToSend)
              : null
          }
        />
      </div>
    </div>
  );
};
export default Chat;
