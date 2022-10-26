/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { supabase } from "../../index.js";
import "./home.css";
import birdieLogo from "../../img/birdie-icon.png";
import ChatLabel from "../ChatComponent/ChatLabel.jsx";
import DropDown from "../DropDownComponent/DropDown.jsx";
import { fetchCurrentUserChats } from "../../utils/helperFunctions.js";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [session, setSession] = useState();
  const [chats, setChats] = useState(null);
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const navigate = useNavigate();
  supabase
    .channel("db-messages")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `receiver=eq.${session?.data.session.user.id}`,
      },
      (payload) => {
        const payloadChatId = payload.new.chatID;
        setChats((prevChats) => {
          const oldChats = prevChats.filter(
            (chat) => chat.id !== payloadChatId
          );
          const chatToModify = chats.find(
            (chat) => chat.id === payload.new.chatID
          );
          chatToModify.updated_at = payload.commit_timestamp;
          chatToModify.messages.push(payload.new);
          const newChats = [...oldChats, chatToModify].sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );

          return newChats;
        });
      }
    )
    .subscribe();

  const getCurrentSession = async () => {
    const session = await supabase.auth.getSession();
    const userId = session.data.session.user.id;
    setSession(session);
    setChats(await fetchCurrentUserChats(userId));
  };

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <div className="home-container">
      <div className="home-container01">
        <div className="home-container02">
          <img src={birdieLogo} alt="logo" className="home-image" />
        </div>
        <div className="home-container03">
          <span className="home-text">Birdie</span>
        </div>
        <div className="home-container04">
          <svg
            viewBox="0 0 1024 1024"
            className="home-icon"
            onClick={() => setDropDownStatus(!dropDownStatus)}
          >
            <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
          </svg>
        </div>
      </div>

      <div className="home-container05">
        {dropDownStatus === true ? (
          <DropDown userId={session?.data.session.user.id} />
        ) : null}
        <div className="home-container06"></div>
        <div className="home-container07"></div>
        <div className="home-container08"></div>
        <div className="home-container09"></div>
        <ul className="home-ul list">
          {(chats !== null &&
            chats.length > 0 &&
            chats.map((chat) => (
              <ChatLabel
                key={chat.id}
                chat={chat}
                currentUserId={session.data.session.user.id}
              />
            ))) || <CircleLoader size="100px" />}
        </ul>
      </div>
    </div>
  );
};
export default Home;
