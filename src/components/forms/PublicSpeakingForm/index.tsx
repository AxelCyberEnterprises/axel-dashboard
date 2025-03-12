import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { PublicSpeakingSchema } from "@/schemas/public-speaking";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputSpeakerNotesSection from "./InputSpeakerNotesSection";
import SpeechPhasesSection from "./SpeechPhasesSection";
import TimeAllocationSection from "./TimeAllocationSection";
import VirtualEnvironmentSection from "./VirtualEnvironmentSection";

export type FormType = z.infer<typeof PublicSpeakingSchema>;

const PublicSpeakingForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<FormType>({
        resolver: zodResolver(PublicSpeakingSchema),
    });

    return (
        <Form {...form}>
            <form className="flex lg:flex-row flex-col gap-6">
                <section className="flex-1 space-y-6">
                    <SpeechPhasesSection {...{ form }} />
                    <TimeAllocationSection {...{ form }} />
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
                        variant="outline"
                        size="lg"
                        className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Save as Draft
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="bg-gunmetal font-normal">
                                Start Session
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-100 max-w-100 h-72 max-h-72 [&_[data-slot='dialog-close']]:p-0 [&_[data-slot='dialog-close']]:bg-transparent [&_[data-slot='dialog-close']>svg]:text-gunmetal [&_[data-slot='dialog-close']>svg:not([class*='size-'])]:size-5">
                            <DialogHeader className="sr-only">
                                <DialogTitle>Start your Session</DialogTitle>
                                <DialogDescription>Start your Session</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="p-2 border border-bright-gray rounded-md size-fit">
                                        <PlayCircle className="size-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <h6>Start your Session</h6>
                                        <p className="text-independence">
                                            Confirm you are ready to use a Session Credit and all your Information and
                                            settings are satisfactory
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-4">
                                    <Button
                                        variant="outline"
                                        className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal w-full h-11"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="bg-gunmetal font-normal w-full h-11">Proceed</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </Form>
    );
};

export default PublicSpeakingForm;
