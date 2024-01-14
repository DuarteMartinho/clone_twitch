import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Container from "./_components/Container";

const SiteLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
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

export default SiteLayout;