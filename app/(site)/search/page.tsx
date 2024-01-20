import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/Results";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

export default function Search({
    searchParams: {
        q
    }
}: SearchPageProps) {
    if (!q) {
        redirect("/");
    }

    return (
        <div
            className="h-full p-8 mx-auto"
        >
            <Suspense
                fallback={<ResultsSkeleton />}
            >
                <Results
                    q={q}
                />
            </Suspense>
        </div>
    )
}
