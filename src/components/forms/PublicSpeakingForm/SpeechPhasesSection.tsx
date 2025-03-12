import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { FormType } from ".";

interface ISpeechPhasesSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SpeechPhasesSection = ({ form }: ISpeechPhasesSectionProps) => {
    const { fields, append, remove } = useFieldArray({
        name: "speechPhases",
        control: form.control,
        rules: {
            minLength: 1,
            maxLength: 10,
        },
    });

    return (
        <section className="space-y-6 border border-bright-gray p-4 rounded-2xl">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h6>Speech Phases</h6>
                    <p className="text-independence">Create your speech phases</p>
                </div>
                <Button
                    type="button"
                    onClick={() => append({ id: fields.length + 1, phaseName: "" })}
                    className="bg-alice-blue hover:bg-alice-blue text-gunmetal rounded-2xl"
                >
                    <Plus className="size-4" />
                    <span>Add Phase</span>
                </Button>
            </div>
            <div className="flex flex-col gap-y-7">
                {fields.map((field, index) => (
                    <FormField
                        control={form.control}
                        key={field.id}
                        name={`speechPhases.${index}.phaseName`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phase Name</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            {...field}
                                            placeholder="Enter phase name"
                                            className="h-11 rounded-lg focus-visible:ring-0 shadow-none text-gunmetal"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-gunmetal h-11 rounded-lg shadow-none"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </section>
    );
};

export default SpeechPhasesSection;
