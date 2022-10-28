import defaultUserImage from "../../img/default.jpg";
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getSession, fetchMessages } from "../../utils/helperFunctions";
import { supabase } from "../../index";

const ChatItem = ({ props, top }) => {
  const {
    messages,
    messagesIntermediateRef,
    session,
    message,
    index,
    receiverUser,
  } = props;
  return (
    <div
      style={{
        top: top,
        height: "auto",
        position: "absolute",
        display: "flex",
        width: "100%",
        alignItems:
          message.sender === session.session.user.id ? "start" : "end",
        flexDirection:
          message.sender === session.session.user.id ? "row" : "row-reverse",
      }}
      key={message.id}
      ref={messagesIntermediateRef}
    >
      <div className="mx-1 h-full w-[10%] rounded-full ">
        {messages[index]?.sender !== messages[index + 1]?.sender ? (
          <img
            className="rounded-full"
            src={
              message.sender === receiverUser.id
                ? receiverUser.avatar_url
                : session.session.user.identities?.[0].identity_data
                    ?.avatar_url || defaultUserImage
            }
            referrerPolicy="no-referrer"
            alt="user"
          />
        ) : null}
      </div>
      <div
        className={`h-full w-[70%] break-before-auto break-words rounded-xl ${
          message.sender === session.session.user.id
            ? "bg-red-400 p-2 text-white"
            : "bg-slate-500 p-2 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

const ChatList = ({ setMessageToSend }) => {
  const [messages, setMessages] = useState(null);
  const params = useParams();
  const receiverUser = useLocation().state.receiver[0];
  const [newMessageTrigger, setNewMessageTrigger] = useState(true);
  const messagesEndRef = useRef(null);
  const viewport = useRef(null);
  const messagesIntermediateRef = useRef(null);
  const [session, setSession] = useState(null);
  const channel = supabase.channel("db-messages");

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
    setMessages(await fetchMessages(params));
    setSession(await getSession());
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  };

  useEffect(() => {
    initilizeChat();

    return () => {
      setMessages(null);
    };
  }, []);

  useEffect(() => {
    if (newMessageTrigger === true) {
      messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
      setMessageToSend("");
      setNewMessageTrigger(false);
    }
  }, [newMessageTrigger]);

  const onScroll = () => {
    let currentIndex = Math.trunc(viewport.current.scrollTop / 50);
    currentIndex =
      currentIndex - itemsNumberDisplay >= messages.length
        ? currentIndex - itemsNumberDisplay
        : currentIndex;
    if (currentIndex !== itemsDisplayStart) {
      setItemsDisplayStart(currentIndex);
      setItemsDisplayEnd(currentIndex + itemsNumberDisplay);
    }
  };

  const [itemsNumberDisplay, setItemsNumberDisplay] = useState(14);
  const [itemsDisplayStart, setItemsDisplayStart] = useState(0);
  const [itemsDisplayEnd, setItemsDisplayEnd] = useState(14);

  useEffect(() => {
    setItemsNumberDisplay(Math.trunc(viewport.current.clientHeight / 40));
  }, []);

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        overflowY: "scroll",
        width: "100%",
      }}
      ref={viewport}
      onScroll={onScroll}
    >
      <div
        style={{
          height: `${messages?.length * 50}px`,
          position: "absolute",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages !== null &&
          messages?.length > 0 &&
          messages.map((message, index) =>
            index >= itemsDisplayStart && index <= itemsDisplayEnd ? (
              <ChatItem
                props={{
                  messagesIntermediateRef,
                  session,
                  receiverUser,
                  message,
                  messages,
                  index,
                }}
                top={index * 50}
              />
            ) : null
          )}
        <div
          ref={messagesEndRef}
          style={{ position: "absolute", bottom: "0" }}
        />
      </div>
    </div>
  );
};
export default ChatList;
