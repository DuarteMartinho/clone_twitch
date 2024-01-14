import { getRecommendations } from "@/lib/recommender-service";
import { Recommendations, RecommendationsSkeleton } from "./Recommendations";
import Wrapper from "./wrapper";
import { Toggle, ToggleSkeleton } from "./Toggle";

export const Sidebar = async () => {

    const recommendations = await getRecommendations();
    return (
        <Wrapper>
            <Toggle />
            <div
                className="space-y-4 pt-4 lg:pt-0"
            >
                <Recommendations
                    data={recommendations}
                />
            </div>
        </Wrapper>
    );
}

export const SidebarSkeleton = () => {
    return (
        <aside
            className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50"
        >
            <ToggleSkeleton />
            <RecommendationsSkeleton />
        </aside>
    );
}