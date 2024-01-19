import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div
            className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground"
        >
            <h1
                className="text-4xl font-bold"
            >
                404
            </h1>
            <p>
                Page not found
            </p>
            <Button
                variant="secondary"
            >
                <Link
                    href="/"
                >
                    Go Home
                </Link>
            </Button>
        </div >
    );
}

export default NotFoundPage;