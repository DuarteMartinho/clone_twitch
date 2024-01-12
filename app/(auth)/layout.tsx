const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div
            className="flex flex-col gap-y-4"
        >
            <nav
                className="p-1 bg-red-500 text-white"
            >
                Auth Navbar
            </nav>
            {children}
        </div>
    );
}

export default AuthLayout;