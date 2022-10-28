import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  IoCameraOutline,
  IoChevronBackCircleSharp,
  IoSendOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { handleSubmitMessage } from "../../utils/helperFunctions";

import ChatList from "./ChatList";

const Chat = ({ user }) => {
  const params = useParams();
  const receiverUser = useLocation().state.receiver[0];
  const navigate = useNavigate();
  const [messageToSend, setMessageToSend] = useState("");

  return (
    <div className="relative h-full w-full bg-inside-circle">
      <div className="flex h-[10%] w-full items-center justify-between px-4">
        <IoChevronBackCircleSharp
          size="70%"
          className="w-10"
          onClick={() => navigate("/home")}
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
      <div className="absolute h-[80%] w-full">
        <ChatList
          setMessageToSend={setMessageToSend}
          receiverUser={receiverUser}
        />
      </div>
      <div className="absolute bottom-0 flex h-[10%] w-full items-center justify-center ">
        <IoSendOutline
          color="white"
          size="30px"
          className="mr-2"
          onClick={(e) =>
            handleSubmitMessage(e, params, user, messageToSend, receiverUser)
          }
        />
        <input
          className="h-[50%] w-[80%] rounded-md px-5"
          placeholder="Type your message here.."
          value={messageToSend}
          type="text"
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? handleSubmitMessage(
                  e,
                  params,
                  user,
                  messageToSend,
                  receiverUser
                )
              : null
          }
        />
      </div>
    </div>
  );
};
export default Chat;
