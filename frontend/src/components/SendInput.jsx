import React, {  useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice"; 

const SendInput = () => {
  const [message,setMessage]=useState("");
  const dispatch=useDispatch()
  const {selectedUser}=useSelector((store)=>store.user)
  const {messages}=useSelector((store)=>store.message)
  const onSubmitHandler=async (e)=>{
    e.preventDefault()
    try {
      
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      console.log(res)
      dispatch(setMessages([...messages,res?.data?.newMessage]))
      
    } catch (error) {
      console.log(error)
    }
    setMessage("")
  }
  return (
    <form onSubmit={onSubmitHandler} className="shrink-0 px-4 my-3">
      <div className="relative w-full">
        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="w-full rounded-full border border-gray-600 bg-gray-800 px-4 py-3 pr-14 text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />

        <button
          type="submit"
          
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white transition-all duration-200 hover:bg-cyan-600 active:scale-95"
        >
          <IoSend className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
