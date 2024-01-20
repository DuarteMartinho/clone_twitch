import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/Results";

export default function Home() {
  return (
    <div
      className="h-full p-8 mx-auto"
    >
      <Suspense
        fallback={<ResultsSkeleton />}
      >
        <Results />
      </Suspense>
    </div>
  )
}
