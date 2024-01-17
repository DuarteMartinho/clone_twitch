"use client"

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useRef, useState, useTransition } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [ingressType, setIngressType] = useState<IngressType>("");
    const [isPending, startTransition] = useTransition();

    const handleGenerate = () => {
        if (!ingressType) return;

        startTransition(() => {
            createIngress({
                ingressType: parseInt(ingressType)
            })
                .then((ingress) => {
                    console.log(ingress);
                    toast.success("Ingress created");
                    closeRef.current?.click();
                }).catch((err) => {
                    console.error(err);
                    toast.error("Failed to create ingress");
                });
        });
    }
    return (
        <Dialog >
            <DialogTrigger
                asChild
            >
                <Button
                    variant={"primary"}
                >
                    Generate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Generate Connection
                </DialogHeader>
                <Select
                    value={ingressType}
                    onValueChange={(value) => {
                        setIngressType(value);
                    }}
                >
                    <SelectTrigger
                        className="w-full"
                    >
                        <SelectValue
                            placeholder="Ingress Type"
                        />
                        <SelectContent>
                            <SelectItem
                                value={RTMP}
                            >
                                RTMP
                            </SelectItem>
                            <SelectItem
                                value={WHIP}
                            >
                                WHIP
                            </SelectItem>
                        </SelectContent>
                    </SelectTrigger>
                </Select>
                <Alert>
                    <AlertTriangle
                        className="h-4 w-4"
                    />
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        This action will generate a new connection key for you to use. You can only have one active connection at a time.
                    </AlertDescription>
                </Alert>
                <div
                    className="flex justify-between"
                >
                    <DialogClose
                        ref={closeRef}
                        asChild
                    >
                        <Button
                            variant={"ghost"}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending || !ingressType}
                        onClick={handleGenerate}
                        variant={"primary"}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}