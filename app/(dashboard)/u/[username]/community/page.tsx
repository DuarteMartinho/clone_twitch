import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

const CommunityPage = async () => {
    const data = await getBlockedUsers();

    const formattedData = data.map((block) => {
        return {
            ...block,
            userId: block.blocked.id,
            username: block.blocked.username,
            imageUrl: block.blocked.imageUrl,
            createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy")
        };
    });

    return (
        <div
            className="p-6"
        >
            <div
                className="mb-4"
            >
                <h1
                    className="text-2xl font-bold"
                >
                    Community Page
                </h1>
            </div>
            <div>
                <DataTable
                    columns={columns}
                    data={formattedData}
                />
            </div>
        </div>
    );
}

export default CommunityPage;