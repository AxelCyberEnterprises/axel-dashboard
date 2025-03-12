import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from ".";

interface IInputSpeakerNotesSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const InputSpeakerNotesSection = ({ form }: IInputSpeakerNotesSectionProps) => {
    return (
        <section className="space-y-6 border border-bright-gray p-4 rounded-2xl">
            <div className="space-y-2">
                <h6>Input Speaker Notes</h6>
                <p className="text-independence">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex flex-col gap-y-7">
                <ControlledFieldWrapper
                    control={form.control}
                    name="inputSpeakerNotes.introductionNotes"
                    label="Introduction Notes"
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Enter your opening remarks and key points"
                            className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                        />
                    )}
                />
                <ControlledFieldWrapper
                    control={form.control}
                    name="inputSpeakerNotes.bodyPhaseNotes"
                    label="Body Phase Notes"
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Main points for your topic"
                            className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                        />
                    )}
                />
                <ControlledFieldWrapper
                    control={form.control}
                    name="inputSpeakerNotes.conclusionNotes"
                    label="Conclusion Notes"
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Enter key points for your conclusion "
                            className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                        />
                    )}
                />
            </div>
        </section>
    );
};

export default InputSpeakerNotesSection;
