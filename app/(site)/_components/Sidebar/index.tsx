import Wrapper from "./wrapper";
import {
    Following,
    FollowingSkeleton
} from "./Following";
import {
    Toggle,
    ToggleSkeleton
} from "./Toggle";
import {
    Recommendations,
    RecommendationsSkeleton
} from "./Recommendations";

import { getRecommendations } from "@/lib/recommender-service";
import { getFollowing } from "@/lib/follow-service";

export const Sidebar = async () => {
    const recommendations = await getRecommendations();
    const following = await getFollowing();

    return (
        <Wrapper>
            <Toggle />
            <div
                className="space-y-4 pt-4 lg:pt-0"
            >
                <Following
                    data={following}
                />
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
            <FollowingSkeleton />
            <RecommendationsSkeleton />
        </aside>
    );
}