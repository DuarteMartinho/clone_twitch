import Link from "next/link";
import {
    SignInButton,
    UserButton,
    currentUser
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Clapperboard, LogOut, User } from "lucide-react";

const Actions = () => {
    return (
        <div
            className="flex items-center justify-end gap-x-2"
        >

            <Button
                className="text-muted-foreground hover:text-primary"
                size={"sm"}
                variant={"ghost"}
                asChild
            >
                <Link
                    href="/"
                >
                    <LogOut
                        className="h-5 w-5 lg:mr-2"
                    />
                    Exit
                </Link>
            </Button>

            <UserButton
                afterSignOutUrl="/"
            />
        </div>
    );
}

export default Actions;