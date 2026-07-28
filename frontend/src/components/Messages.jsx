import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage.jsx'

const Messages = () => {
  useGetMessages()

    useGetRealTimeMessage()
    const {messages}=useSelector((store)=>store.message)
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      {messages && messages.length > 0 ? (
        messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })
      ) : null}
    </div>
  )
}

export default Messages
