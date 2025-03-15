import SessionHistoryTable from "@/components/tables/session-history-table/admin";

const AdminSessionHistory = () => {
    return (
        <section className="py-3 px-4 flex flex-col gap-y-6">
            <h6>Session History</h6>
            <SessionHistoryTable />
        </section>
    );
};

export default AdminSessionHistory;
