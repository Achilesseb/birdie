/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { supabase } from "../../index.js";
import "./home.css";
import useLogout from "../../customHooks/useLogout.js";
import birdieLogo from "../../img/birdie-icon.png";
import ChatLabel from "./ChatLabel.jsx";
import { fetchCurrentUserChats } from "../../utils/helperFunctions.js";
import { CircleLoader } from "react-spinners";
import NavigationBar from "../NavigationBarComponent/NavigationBar.jsx";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [session, setSession] = useState();
  const [chats, setChats] = useState(null);
  const logout = useLogout();
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
          <FiLogOut size="40" color="white" onClick={handleLogout} />
        </div>
      </div>
      <div className="home-container05">
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
      <NavigationBar />
    </div>
  );
};
export default Home;
