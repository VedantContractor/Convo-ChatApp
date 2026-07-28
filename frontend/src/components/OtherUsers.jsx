import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  //custom hooks
    useGetOtherUsers();
    const {otherUsers}=useSelector(store=>store.user)
    if(!otherUsers) return;
  return (
    <div className="mt-3 flex flex-col gap-2 overflow-y-auto scrollbar-none pr-1">
      {
        otherUsers.map((user)=>{
          return (
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
    </div>
  );
};

export default OtherUsers;