import StartSession from "@/components/dialogs/dialog-contents/StartSession";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { PublicSpeakingDefaultGoals } from "@/config/form-field-options";
import { PublicSpeakingSchema } from "@/schemas/public-speaking";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import GoalsSection from "./GoalsSection";
import InputSpeakerNotesSection from "./InputSpeakerNotesSection";
import TimeAllocationSection from "./TimeAllocationSection";
import VirtualEnvironmentSection from "./VirtualEnvironmentSection";

export type FormType = z.infer<typeof PublicSpeakingSchema>;

const PublicSpeakingForm = () => {
    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PublicSpeakingSchema),
        defaultValues: useMemo(() => ({ goals: PublicSpeakingDefaultGoals }), []),
    });

    return (
        <Form {...form}>
            <form className="flex lg:flex-row flex-col gap-6">
                <section className="flex-1 space-y-12">
                    <GoalsSection {...{ form }} />
                    <TimeAllocationSection />
                    <InputSpeakerNotesSection {...{ form }} />
                </section>
                <section className="space-y-6">
                    <VirtualEnvironmentSection {...{ form }} />
                    <div className="flex items-center justify-between">
                        <p>Enable AI Generated Questions</p>
                        <Switch className="p-0 justify-start h-6 w-10 [&_[data-slot='switch-thumb']]:size-5" />
                    </div>
                </section>
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between border-t border-bright-gray bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <div className="flex items-center gap-x-4">
                        <Button
                            type="button"
                            size="lg"
                            className="bg-green-sheen hover:bg-green-sheen/80 font-normal transition"
                        >
                            Skip Setup
                        </Button>
                        <Button
                            type="button"
                            size="lg"
                            className="bg-[#D4D6DF] hover:bg-[#D4D6DF]/80 text-gunmetal font-normal transition"
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        key: "start-session",
                                        children: <StartSession />,
                                    }),
                                )
                            }
                        >
                            Start Session
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default PublicSpeakingForm;
