import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserID } from "@/lib/stream-service";

import { URLCard } from "./_components/URLCard";
import { KeyCard } from "./_components/KeyCard";
import { ConnectModal } from "./_components/ConnectModal";

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
                className="flex items-center justify-between mb-4"
            >
                <h1
                    className="text-2xl font-bold"
                >
                    Keys & URLs Settings
                </h1>
                <ConnectModal />
            </div>
            <div
                className="space-y-4"
            >


                <URLCard
                    title="Stream URL"
                    description="Use this key to stream to your channel."
                    value={stream.serverUrl}
                />

                <KeyCard
                    title="Stream Key"
                    description="Use this key to stream to your channel."
                    value={stream.streamKey}
                />
            </div>
        </div>
    );
}

export default ChatPage;