import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSelectedUser } from "../redux/userSlice";

function Sidebar() {
  const [search,setSearch]=useState("")
  const {otherUsers}=useSelector((store)=>store.user)
  const dispatch=useDispatch()

  

  const navigate=useNavigate()
  const logoutHandler=async()=>{
    try {
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`)
      navigate("/")
      toast.success(res.data.message)
       dispatch(setAuthUser(null));
       dispatch(setMessages(null));
       dispatch(setOtherUsers(null));
       dispatch(setSelectedUser(null));
      
    } catch (error) {
      console.log(error)
    }
  }
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return toast.error("Please enter a name");
    }

    const conversationUser = otherUsers?.find((user) =>
      user.fullName?.toLowerCase()?.includes(normalizedSearch)
    );

    if (!conversationUser) {
      return toast.error("User not found");
    }

    dispatch(setSelectedUser(conversationUser));
    setSearch("");
  };
  return (
    <div className="border-r border-slate-500 flex flex-col p-4">
      <form onSubmit={searchSubmitHandler} action="" className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full rounded-full border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />

          <button
            type="submit"
            className="btn btn-circle bg-cyan-500 border-none text-white hover:bg-cyan-600"
          >
            <IoSearch className="h-5 w-5" />
          </button>
        </div>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-auto pt-2">
        <button onClick={logoutHandler} className="btn btn-sm text-white bg-red-600 hover:bg-red-400">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
