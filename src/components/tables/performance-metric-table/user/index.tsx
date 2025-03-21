import { BaseTable } from "../../base-table";
import { columns } from "./columns";
import { data } from "./data";

const PresentationMetricsTable = () => {

  return (
    <div className="w-full">
      <BaseTable 
        columns={columns} 
        data={data} 
        showToolBar={false} 
        tableHeaderItemClassName="font-medium py-4 text-[#252A39]" tableHeaderClassName="bg-[#F7F9FC]"
        pageSize={7}
      />
    </div>
  );
};

export default PresentationMetricsTable;