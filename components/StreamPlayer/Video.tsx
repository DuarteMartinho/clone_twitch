"use client"

import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from "@livekit/components-react";
import { Offline } from "./Offline";
import { Loading } from "./Loading";
import { LiveVideo } from "./LiveVideo";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export const Video = ({
    hostName,
    hostIdentity
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <Offline hostName={hostName} />
    } else if (!participant || tracks.length === 0) {
        content = <Loading label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }

    return (
        <div
            className="aspect-video border-b group relative"
        >
            {content}
        </div>
    )
}