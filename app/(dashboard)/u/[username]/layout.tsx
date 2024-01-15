import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import Container from "./_components/Container";

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: {
        username: string;
    }
}

const DashboardLayout = async ({
    children,
    params: {
        username,
    }
}: DashboardLayoutProps) => {
    const self = await getSelfByUsername(username);

    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div
                className="flex h-full pt-20"
            >
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
}

export default DashboardLayout;