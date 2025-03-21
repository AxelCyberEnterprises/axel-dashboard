import ShadSelect from "@/components/dashboard/Select";
import { ColumnDef } from "@tanstack/react-table";
import reload from '../../../../assets/images/svgs/reload.svg';
import document from '../../../../assets/images/svgs/document.svg';

export type Metric = {
  metric: string;
  category: string;
  sessionType: number;
  sequence2: number;
  sequence3: number;
  sequence4: number;
  sequence5: number;
  sequence6: number;
};

const sessionOptions = [
  {
    value: "compare-session",
    label: "Compare Session",
    icon: reload
  },
  {
    value: "full-report",
    label: "View Full Report",
    icon: document
  },
];

const handleSessionTypeChange = (value: string) => {
  console.log("Selected session:", value);
};

export const columns: ColumnDef<Metric, any>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: any = row.getValue("category");
      let bgColor = "";

      switch (category) {
        case "Delivery":
          bgColor = "bg-gray-100";
          break;
        case "Content":
          bgColor = "bg-green-50";
          break;
        case "Impact":
          bgColor = "bg-blue-50";
          break;
        case "Clarity":
          bgColor = "bg-red-50";
          break;
        default:
          bgColor = "bg-gray-100";
      }

      return (
        <span className={`px-3 py-1 rounded-full text-sm border border-[#E0E0E0] ${bgColor}`}>
          {category}
        </span>
      );
    }
  },
  {
    accessorKey: "sessionType",
    header: () => {
      return <ShadSelect
        options={sessionOptions}
        onChange={handleSessionTypeChange}
        placeholder="Session Type"
        className='w-fit sm:rounded-[10px] rounded-[5px] shadow-none sm:py-3 py-1 sm:px-4 px-2 sm:h-9 h-7 text-[#252A39] focus-visible:ring-0 active:shadow-none border-none bg-transparent'
        showIcon={false}
        placeholderClassname="text-[#252A39] "
      />
    },
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sessionType"));
    }
  },
  {
    accessorKey: "sequence2",
    header: "Sequence 2",
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sequence2"));
    }
  },
  {
    accessorKey: "sequence3",
    header: "Sequence 3",
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sequence3"));
    }
  },
  {
    accessorKey: "sequence4",
    header: "Sequence 4",
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sequence4"));
    }
  },
  {
    accessorKey: "sequence5",
    header: "Sequence 5",
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sequence5"));
    }
  },
  {
    accessorKey: "sequence6",
    header: "Sequence 6",
    cell: ({ row }) => {
      return renderScoreCell(row.getValue("sequence6"));
    }
  },
];

const renderScoreCell = (score: number) => {
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";

  if (score >= 85) {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (score >= 65) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (score <= 50) {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }

  return (
    <div className="flex justify-center">
      <span className={`${bgColor} ${textColor} w-8 h-8 rounded-full flex items-center justify-center font-medium !text-xs`}>
        {score}
      </span>
    </div>
  );
};