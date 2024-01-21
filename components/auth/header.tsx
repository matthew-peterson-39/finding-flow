import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";

const FONT = Poppins({subsets: ["latin"], weight:["600"]})

interface HeaderProps {
    label: string;
}
export const Header = ({
    label
}: HeaderProps) => {
    return (
        <>
        <div className="w-full flex flex-col gap-y-4 items-center">
            <h1 className={cn("text-3xl font-semibold", FONT.className)}>
                Auth
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
        </>
    )
}