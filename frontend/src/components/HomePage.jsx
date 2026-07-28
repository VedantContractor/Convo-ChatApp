import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux';


function HomePage() {
  const { loading } = useSelector((store) => store.user);

if (loading) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-10 py-8 shadow-2xl">
        {/* Avatar Skeleton */}
        <div className="h-20 w-20 animate-pulse rounded-full bg-white/20"></div>

        {/* Name Skeleton */}
        <div className="h-5 w-40 animate-pulse rounded bg-white/20"></div>

        {/* Loading Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>

        <p className="text-lg font-medium text-white">
          Loading your chats...
        </p>
      </div>
    </div>
  );
}
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
    
      <div className="sm:h-112.5 md:h-137.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex">
        <Sidebar />
        <MessageContainer  />
      </div>
    </div>
  )
}

export default HomePage