import { Button } from "@/components/ui/button";
import Pagination from "@mui/material/Pagination";
import { Table } from "@tanstack/react-table";

interface IBaseTablePaginationProps<TData> {
    table: Table<TData>;
}

const BaseTablePagination = <TData,>({ table }: IBaseTablePaginationProps<TData>) => {
    return (
        <div className="flex md:flex-row flex-col-reverse md:gap-y-0 gap-y-4 items-center justify-between w-full">
            <p className="whitespace-nowrap text-gunmetal text-sm">
                Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </p>
            <div className="flex items-center justify-end gap-x-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-none bg-transparent hover:bg-bright-gray shadow-none font-normal text-gunmetal disabled:text-gray-blue h-8"
                >
                    Previous
                </Button>
                <Pagination
                    variant="outlined"
                    count={table.getPageCount()}
                    page={table.getState().pagination.pageIndex + 1}
                    onChange={(_, page) => table.setPageIndex(page - 1)}
                    hideNextButton
                    hidePrevButton
                    sx={{
                        "& .MuiPaginationItem-root": { color: "var(--color-gunmetal)" },
                        "& .Mui-selected": { backgroundColor: "var(--color-bright-gray)" },
                    }}
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-none bg-transparent hover:bg-bright-gray shadow-none font-normal text-gunmetal disabled:text-gray-blue"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default BaseTablePagination;
