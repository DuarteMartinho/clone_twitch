"use client"

import { useTracks } from "@livekit/components-react"
import { Participant, Track } from "livekit-client"
import { useEffect, useRef, useState } from "react"
import { FullscreenControl } from "./FullscreenControl"
import { useEventListener } from "usehooks-ts"
import { VolumeControl } from "./VolumeControl"

interface LiveVideoProps {
    participant: Participant
}

export const LiveVideo = ({
    participant
}: LiveVideoProps) => {
    const [volume, setVolume] = useState(50);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => track.participant === participant).forEach((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current);
        }
    });

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        }
        else {
            wrapperRef.current?.requestFullscreen();
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;

        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0;

        setVolume(isMuted ? 50 : 0);


        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    useEffect(() => {
        handleVolumeChange(volume);
    }, [videoRef.current]);

    return (
        <div
            className="relative h-full flex"
            ref={wrapperRef}
        >
            <video width={"100%"} ref={videoRef} />
            <div
                className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all"
            >
                <div
                    className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4"
                >
                    <VolumeControl
                        value={volume}
                        onChange={handleVolumeChange}
                        onToggle={toggleMute}
                    />
                    <FullscreenControl
                        isFullscreen={isFullscreen}
                        onToggle={toggleFullscreen}
                    />
                </div>

            </div>
        </div>
    )
}