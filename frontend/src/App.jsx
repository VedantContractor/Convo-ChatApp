
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



  import { Navigate } from "react-router-dom";



  function App() {
    const dispatch=useDispatch()
    const {authUser}=useSelector((store)=>store.user)
    const {socket}=useSelector((store)=>store.socket)


      useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
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
        const socket=io(`${import.meta.env.VITE_API_URL}`,{
          query:{
            userId:authUser._id
          },
          withCredentials:true
          
        })  
        dispatch(setSocket(socket))
        socket?.on('getOnlineUsers',(onlineUsers)=>{
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

    const router = createBrowserRouter([
  {
    path: "/",
    element: authUser ? <HomePage /> : <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: authUser ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: "/signup",
    element: authUser ? <Navigate to="/" replace /> : <Signup />,
  },
]);


    return (
      <div className="container mx-auto">
      <RouterProvider router={router} />
      </div>
    );
  }

  export default App;