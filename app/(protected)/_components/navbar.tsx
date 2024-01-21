"use client";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-secondary flex justify-between items-center p-4 rounded-b-xl w-full shadow-sm z-50">
      <div className="flex gap-x-2 overflow-x-auto" style={{ marginRight: "auto" }}>
        <Button 
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
          >
          <Link href={"/server"}>
            Server
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
          >
          <Link href={"/client"}>
            Client
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
          >
          <Link href={"/admin"}>
            Admin
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/tasks" ? "default" : "outline"}
          >
          <Link href={"/tasks"}>
            Tasks
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
          >
          <Link href={"/settings"}>
            Settings
          </Link>
        </Button>
        
      </div>
      <div className="flex-shrink-0">
        <UserButton />
      </div>
    </nav>
  
  )
}

export default Navbar