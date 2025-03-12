import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Slider } from "@/components/ui/slider";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from ".";
import { Clock } from "lucide-react";

interface ITimeAllocationSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const TimeAllocationSection = ({ form }: ITimeAllocationSectionProps) => {
    return (
        <section className="space-y-4 border border-bright-gray p-4 rounded-2xl">
            <div className="space-y-2">
                <h6>Time Allocation</h6>
                <p className="text-independence">Allocate time for each phase of your speech</p>
            </div>
            <div className="flex flex-col gap-y-7 p-4 border border-bright-gray rounded-lg">
                <div className="flex items-center gap-x-3">
                    <ControlledFieldWrapper
                        control={form.control}
                        name="timeAllocation.introductionTime"
                        label="Introduction (2-3 minutes)"
                        className="flex-1 gap-4"
                        render={() => <Slider max={3} step={1} />}
                    />
                    <div className="size-11 border border-bright-gray grid place-content-center rounded-md">
                        <span className="text-sm">2</span>
                    </div>
                    <span className="text-sm">Mins</span>
                </div>
                <div className="flex items-center gap-x-3">
                    <ControlledFieldWrapper
                        control={form.control}
                        name="timeAllocation.bodyPhaseTime"
                        label="Body (5-10 minutes)"
                        className="flex-1 gap-4"
                        render={() => <Slider max={10} step={1} />}
                    />
                    <div className="size-11 border border-bright-gray grid place-content-center rounded-md">
                        <span className="text-sm">8</span>
                    </div>
                    <span className="text-sm">Mins</span>
                </div>
                <div className="flex items-center gap-x-3">
                    <ControlledFieldWrapper
                        control={form.control}
                        name="timeAllocation.conclusionTime"
                        label="Conclusion (2-3 minutes)"
                        className="flex-1 gap-4"
                        render={() => <Slider max={3} step={1} />}
                    />
                    <div className="size-11 border border-bright-gray grid place-content-center rounded-md">
                        <span className="text-sm">3</span>
                    </div>
                    <span className="text-sm">Mins</span>
                </div>
                <div className="flex items-center justify-between bg-bright-gray p-3 rounded-lg">
                    <div className="flex items-center gap-x-2">
                        <Clock className="size-4" />
                        <span className="text-sm text-independence">Total Duration</span>
                    </div>
                    <span className="text-sm">30 minutes</span>
                </div>
            </div>
        </section>
    );
};

export default TimeAllocationSection;
