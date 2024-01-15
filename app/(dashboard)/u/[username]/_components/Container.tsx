"use client"

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({
    children,
}: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const {
        collapsed,
        onCollapse,
        onExpand
    } = useDashboardSidebar((state) => state);

    useEffect(() => {
        if (matches) {
            onCollapse();
        }
        else {
            onExpand();
        }
    }, [matches]);

    return (
        <div
            className={cn(
                "flex-1",
                collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
            )}
        >
            {children}
        </div>
    );
}

export default Container;