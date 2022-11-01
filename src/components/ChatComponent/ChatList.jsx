import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getSession, fetchMessages } from "../../utils/helperFunctions";
import { supabase } from "../../index";
import ChatItem from "./ChatItem";

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
  const [itemsNumberDisplay, setItemsNumberDisplay] = useState(14);
  const [itemsDisplayStart, setItemsDisplayStart] = useState(0);
  const [itemsDisplayEnd, setItemsDisplayEnd] = useState(14);

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
