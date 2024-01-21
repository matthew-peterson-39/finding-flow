import React from "react"
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-4 md:gap-y-10 items-center justify-center bg-gradient-to-br from-zinc-700 to-slate-800 px-4">
        <Navbar />
        {children}
    </div>
  )
}

export default ProtectedLayout