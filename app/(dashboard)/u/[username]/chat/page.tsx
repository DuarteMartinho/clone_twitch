import { getSelf } from "@/lib/auth-service";
import { getStreamByUserID } from "@/lib/stream-service";
import { ToggleCard } from "./_components/ToggleCard";

const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserID(self.id);

    if (!stream) {
        throw new Error("Stream not found!");
    }

    return (
        <div
            className="p-6"
        >
            <div
                className="mb-4"
            >
                <h1
                    className="text-2xl font-bold"
                >
                    Chat Settings
                </h1>
            </div>
            <div
                className="space-y-4"
            >
                <ToggleCard
                    field="isChatEnabled"
                    label="Chat"
                    description="Enable chat for your stream."
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Chat Delay"
                    description="Enable chat delay for your stream."
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Followers Only Chat"
                    description="Enable followers only chat for your stream."
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    );
}

export default ChatPage;