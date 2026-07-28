import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Message from "./Message";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function MessageContainer() {
  const {selectedUser,authUser}=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  // useEffect(()=>{
  //   return ()=> dispatch(setSelectedUser(null))
  // },[])
  return (
    <>
    {
      selectedUser!=null ? (
 <div className="md:min-w-162.5 ml-1 flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 rounded-xl p-3 transition-all duration-200 cursor-pointer bg-gray-800 hover:bg-gray-700">
        <div className="avatar ">
          <div className="w-12 rounded-full ring ring-cyan-500 ring-offset-2 ring-offset-zinc-900">
            <img
              src={selectedUser?.profilePhoto}
              alt=""
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{selectedUser?.fullName}</h3>
          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
      ):(
        <div className="md:min-w-162.5 ml-1 flex h-full min-h-0 flex-col justify-center items-center">
          
        <h1 className="text-2xl font-bold text-white  ">{`Hello ${authUser?.fullName}`}</h1>
        <p className="text-gray-50 text-lg mt-2">Select a user to start chatting</p>
      </div>
      )
    } 
    </>
   
  );
}

export default MessageContainer;
