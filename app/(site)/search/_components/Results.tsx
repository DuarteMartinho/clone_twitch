import { Skeleton } from "@/components/ui/skeleton";
import { searchStreams } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./ResultCard";

interface ResultsProps {
    q?: string;
}

export const Results = async ({
    q
}: ResultsProps) => {
    const data = await searchStreams(q);

    return (
        <div>
            <h2
                className="text-lg font-semibold mb-4"
            >
                Results for &quot;{q}&quot;
            </h2>
            {
                data.length === 0 && (
                    <div
                        className="text-muted-foreground text-sm"
                    >
                        No streams found.
                    </div>
                )
            }

            <div
                className="flex flex-col gap-y-4"
            >
                {
                    data.map((stream) => {
                        return (
                            <ResultCard
                                key={stream.id}
                                data={stream}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton
                className="h-8 w-[290px] mb-4"
            />
            <div
                className="flex flex-col gap-y-4"
            >
                {
                    [...Array(3)].map((_, i) => {
                        return (
                            <ResultCardSkeleton
                                key={i}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}