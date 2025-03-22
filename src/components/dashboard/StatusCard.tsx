import React from 'react';
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  value: string;
  subtext: string;
  className?: string;
  isPositive?: boolean;
  [key: string]: any; // Allows passing additional props
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconAlt,
  title,
  value,
  subtext,
  className,
  ...moreProps
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-4 flex flex-col gap-4 shadow-sm border border-gray-100",
      className
    )} {...moreProps}>
      <div className="flex items-center gap-2">
        <img src={icon} alt={iconAlt} className="w-5 h-5" />
        <span className="text-gray-700 text-sm font-medium">{title}</span>
      </div>
      
      <div className="flex flex-col gap-1">
        <p className="sm:text-3xl text-2xl font-medium text-[#070D17]">
          {value}
        </p>
        <p className="text-[#333333] text-sm mt-2">{subtext}</p>
      </div>
    </div>
  );
};

interface StatsCardSectionProps {
  cards: StatCardProps[];
  className?: string;
}

const StatsCardSection: React.FC<StatsCardSectionProps> = ({ cards, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StatsCardSection;
