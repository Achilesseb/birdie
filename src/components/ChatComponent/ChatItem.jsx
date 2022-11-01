import defaultUserImage from "../../img/default.jpg";
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
export default ChatItem;
