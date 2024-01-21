import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const FONT = Poppins({subsets: ["latin"], weight:["600"]})

export default function Home() {
  return (
  <>
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-slate-800">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className={cn("text-6xl text-center font-semibold text-white drop-shadow-md", FONT.className)}>
          Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>
        <div className="flex">       
          <LoginButton mode="modal" asChild>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  </> 
  );
}
