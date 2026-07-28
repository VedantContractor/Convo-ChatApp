import React, { useEffect } from 'react'
import axios from 'axios'
import { setOtherUsers } from '../redux/userSlice'
import { useDispatch } from 'react-redux';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
 
    useEffect(()=>{
        const fetchOtherUsers=async()=>{
            try {
                axios.defaults.withCredentials = true;
                const res=await axios.get('http://`${import.meta.env.VITE_API_URL}`/api/v1/user/')
                
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchOtherUsers();
    },[])
}

export default useGetOtherUsers
