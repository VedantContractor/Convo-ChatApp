import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();

  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = message?.senderId === authUser?._id;

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end" : "chat-start"} my-4`}
    >
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ring ring-cyan-500/40 ring-offset-2 ring-offset-zinc-900">
          <img
            src={
              isSender
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
            alt="profile"
          />
        </div>
      </div>

      {/* Time */}
      <div className="chat-header mb-1">
        <time className="text-[11px] text-gray-500">12:45 PM</time>
      </div>

      {/* Message Bubble */}
      <div
        className={`chat-bubble max-w-xs md:max-w-md lg:max-w-lg px-5 py-3 border shadow-xl transition-all duration-300 wrap-break-word ${
          isSender
            ? "bg-linear-to-r from-cyan-500 to-sky-500 text-white border-cyan-400 rounded-3xl rounded-br-md"
            : "bg-linear-to-r from-slate-700 via-zinc-800 to-slate-900 text-gray-100 border-slate-600 rounded-3xl rounded-bl-md"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;