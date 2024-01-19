"use client"

import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}: InfoModalProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const closeRef = useRef<ElementRef<"button">>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({
                name
            })
                .then(() => {
                    toast.success("Stream updated!")
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong!"));
        });
    }

    const handleDeleteThumbnail = () => {
        startTransition(() => {
            updateStream({
                thumbnailUrl: null
            })
                .then(() => {
                    setThumbnailUrl(null);
                    toast.success("Thumbnail deleted!");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong!"));
        });
    }

    return (
        <Dialog>
            <DialogTrigger
                asChild
            >
                <Button
                    variant="link"
                    size="sm"
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Stream Info
                    </DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form
                    className="space-y-14"
                    onSubmit={onSubmit}
                >
                    <div
                        className="space-y-2"
                    >
                        <Label>
                            Name
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isPending}
                            placeholder="Enter a name"
                        />
                    </div>
                    <div
                        className="space-y-2"
                    >
                        <Label>
                            Thumbnail
                        </Label>
                        {
                            thumbnailUrl ? (
                                <div
                                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10"
                                >
                                    <div
                                        className="absolute top-2 right-2 z-[10]"
                                    >
                                        <Hint
                                            label="Delete thumbnail"
                                            side="left"
                                            asChild
                                        >
                                            <Button
                                                onClick={handleDeleteThumbnail}
                                                variant="ghost"
                                                type="button"
                                                className="h-auto w-auto p-1.5"
                                            >
                                                <Trash
                                                    className="h-5 w-5"

                                                />
                                            </Button>
                                        </Hint>
                                    </div>
                                    <Image
                                        src={thumbnailUrl}
                                        layout="fill"
                                        className="object-cover"
                                        alt="Thumbnail"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="rounded-xl border outline-dashed outline-muted"
                                >
                                    <UploadDropzone
                                        endpoint={"thumbnailUploader"}
                                        appearance={{
                                            label: {
                                                color: "#FFFFFF"
                                            },
                                            allowedContent: {
                                                color: "#FFFFFF"
                                            },
                                        }}
                                        onClientUploadComplete={(res) => {
                                            setThumbnailUrl(res?.[0]?.url);
                                            router.refresh();
                                            closeRef.current?.click();
                                        }}

                                    />
                                </div>
                            )
                        }

                    </div>
                    <div
                        className="flex justify-between"
                    >
                        <DialogClose
                            ref={closeRef}
                            asChild
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}