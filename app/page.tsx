import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const FONT = Poppins({subsets: ["latin"], weight:["600"]})

export default function Home() {
  return (
  <>
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-slate-800 px-4">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center">
        <h1 className={cn("text-4xl md:text-6xl text-center font-semibold text-white drop-shadow-md", FONT.className)}>
          Finding Flow
        </h1>
        <p className="text-white text-base md:text-lg">
          Find your flow, own your life.
        </p>
        <div className="flex">       
          <LoginButton mode="modal" asChild>
            <Button variant={"secondary"} size={"default"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  </> 
  );
}
