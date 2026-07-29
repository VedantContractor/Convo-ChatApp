
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const {selectedUser,onlineUsers} = useSelector((store) => store.user);
  const isOnline=onlineUsers?.includes(user._id)

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  const isSelected = selectedUser?._id === user?._id;

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`
          flex items-center gap-3
          p-3
          rounded-2xl
          cursor-pointer
          backdrop-blur-lg
          border transition-all duration-300
          active:scale-[0.98]
          ${
            isSelected
              ? "bg-cyan-500/20 border-cyan-400/70 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              : "bg-white/5 border-white/10 hover:bg-cyan-500/15 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:-translate-y-1"
          }
        `}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full ring-2 ring-cyan-400/30">
            <img
              src={user.profilePhoto}
              alt="User"
            />
          </div>
        </div>

        <div>
          <p className="text-white font-semibold text-base tracking-wide">
            {user.fullName}
          </p>
        </div>
      </div>
    </>
  );
};

export default OtherUser;