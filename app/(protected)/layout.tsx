import React from "react"
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full 
    flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-zinc-700 to-slate-800">
        <Navbar />
        {children}
    </div>
  )
}

export default ProtectedLayout