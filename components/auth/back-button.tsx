"use client";

import { link } from "fs";
import { Button } from "../ui/button";
import Link from "next/link";
import { HiRefresh } from "react-icons/hi";

interface BackButtonProps {
    href: string;
    label: string;
};

export const BackButton = ({
    href,
    label
}: BackButtonProps) => {
    return (
        <Button
            variant={"link"}
            className="font-normal w-full"
            size={"sm"}
            asChild>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}