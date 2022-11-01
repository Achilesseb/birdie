import { useState, useEffect } from "react";
import { supabase } from "../../index";
import "../HomeComponent/home.css";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../utils/helperFunctions";

const ChatLabel = ({ chat, currentUserId }) => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState(null);
  const receiverId = chat.users.find((id) => id !== currentUserId);
  const getReceiverData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", receiverId);
    setReceiver(data);
  };
  const lastMessage = chat.messages[chat.messages.length - 1];

  useEffect(() => {
    getReceiverData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigateToSpecificChat = (target) => {
    return navigate(`/chat/${target}`, {
      replace: true,
      state: { receiver },
    });
  };
  if (receiver)
    return (
      <li
        className="home-li list-item"
        onClick={() => handleNavigateToSpecificChat(chat.id)}
      >
        <div className="home-container10">
          <img
            src={receiver[0]?.avatar_url}
            alt="receiverImage"
            className="home-image1"
          />
        </div>
        <div className="home-container11">
          <div className="home-container12">
            <span className="home-text1">{receiver[0]?.username}</span>
          </div>
          <div className="home-container13">
            <div className="home-container14">
              <span className="home-text2">
                {(chat.messages !== null &&
                chat.messages.length > 0 &&
                lastMessage.sender === currentUserId
                  ? `You: ${
                      lastMessage?.text.length > 15
                        ? lastMessage?.text.substring(0, 15) + "..."
                        : lastMessage?.text
                    }`
                  : lastMessage?.text.length > 20
                  ? lastMessage?.text.substring(0, 20) + "..."
                  : lastMessage?.text) || "Send a message to .."}
              </span>
              <span className="home-text2">
                {timeSince(lastMessage.created_at)}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
};

export default ChatLabel;
