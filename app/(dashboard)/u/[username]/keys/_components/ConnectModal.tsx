"use client"

import { Button } from "@/components/ui/button";

import {
    Dialog,
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

export const ConnectModal = () => {
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
                <Select>
                    <SelectTrigger
                        className="w-full"
                    >
                        <SelectValue>
                            Ingress Type
                        </SelectValue>
                        <SelectContent>
                            <SelectItem
                                value="RTMP"
                            >
                                RTMP
                            </SelectItem>
                            <SelectItem
                                value="WHIP"
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
                        This action will generate a new connection key. If you are already connected to a device, you will need to reconnect with the new key.
                    </AlertDescription>
                </Alert>
                <div
                    className="flex justify-between"
                >
                    <Button
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => { }}
                        variant={"primary"}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}