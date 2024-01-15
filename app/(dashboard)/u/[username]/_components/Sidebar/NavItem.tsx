import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
}

export const NavItem = ({
    label,
    href,
    icon: Icon,
    isActive
}: NavItemProps) => {
    const { collapsed } = useDashboardSidebar((state) => state);
    return (
        <Button
            asChild
            variant={"ghost"}
            className={cn(
                "w-full h-12",
                isActive && "bg-accent",
                collapsed ? "justify-center" : "justify-start"
            )}
        >
            <Link
                href={href}
            >
                <div
                    className="flex items-center gap-x-4"
                >
                    <Icon
                        className={cn(
                            "h-4 w-4",
                            collapsed ? "mr-0" : "mr-4"
                        )}
                    />
                    {
                        !collapsed && (
                            <span>
                                {label}
                            </span>
                        )
                    }
                </div>
            </Link>
        </Button>
    );
}

export const NavItemSkeleton = () => {
    return (
        <li
            className="flex items-center gap-x-4 px-3 py-2"
        >
            <Skeleton
                className="min-h-[48px] min-w-[48px] rounded-md"
            />
            <div
                className="flex-1 hidden lg:block"
            >
                <Skeleton
                    className="h-6"
                />
            </div>
        </li>
    );
}