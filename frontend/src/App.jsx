
  import {createBrowserRouter,RouterProvider} from 'react-router-dom';
  import Signup from './components/Signup';
  import HomePage from './components/HomePage';
  import Login from './components/Login';
  import { useDispatch, useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import { io } from 'socket.io-client';

  import { setSocket } from './redux/socketSlice';
  import { setOnlineUsers } from './redux/userSlice';
  import axios from "axios";

  import { setAuthUser ,setLoading} from "./redux/userSlice";



  const router=createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])

  function App() {
    const dispatch=useDispatch()
    const {authUser}=useSelector((store)=>store.user)
    const {socket}=useSelector((store)=>store.socket)


      useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/me",
          {
            withCredentials: true,
          }
        );

        dispatch(setAuthUser(res.data));
      } catch (err) {
        dispatch(setAuthUser(null));
      }finally {
      dispatch(setLoading(false));
    }
    };

    getCurrentUser();
  }, []);


    useEffect(()=>{
      if(authUser){
        const socket=io('http://localhost:8080',{
          query:{
            userId:authUser._id
          },
          withCredentials:true
          
        })  
        dispatch(setSocket(socket))
        socket.on('getOnlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
        })  
        return ()=> socket.close()
      }
      else{
        if(socket){
          socket.close();
          dispatch(setSocket(null))
        }
      }

    },[authUser])
    return (
      <div className="container mx-auto">
      <RouterProvider router={router} />
      </div>
    );
  }

  export default App;