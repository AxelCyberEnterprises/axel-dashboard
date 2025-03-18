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
import { PresentationPracticeSchema } from "@/schemas/presentation-practice";
import { setslidePreviews } from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import SlideDetailsSection from "./SlideDetailsSection";
import SlidePreviewSection from "./SlidePreviewSection";
import UploadSlideSection from "./UploadSlideSection";

export type FormType = z.infer<typeof PresentationPracticeSchema>;

const PresentationPracticeForm = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const form = useForm<FormType>({
        resolver: zodResolver(PresentationPracticeSchema),
    });

    useEffect(() => {
        const subscription = form.watch((values, { name }) => {
            // console.log("Values: ", values);

            if (name !== "files" || !("files" in values && values.files)) return;

            const filePreviews = [];

            for (let i = 0; i < values.files.length; i++) {
                const file = values.files.item(i) as File;
                filePreviews.push(URL.createObjectURL(file));
            }

            dispatch(setslidePreviews(filePreviews));
        });

        return () => subscription.unsubscribe();
    }, [dispatch, form]);

    return (
        <Form {...form}>
            <form className="flex items-start px-4 pb[15vh]">
                <UploadSlideSection
                    {...{ form }}
                    className="flex-1 h-[calc(100vh-56.53px)] overflow-y-auto hide-scrollbar px-4 pt-4 pb-[15vh] border-x border-bright-gray"
                />
                <SlideDetailsSection
                    {...{ form }}
                    className="flex-3 h-[calc(100vh-56.53px)] overflow-y-auto hide-scrollbar px-4 pt-4 pb-[15vh]"
                />
                <SlidePreviewSection
                    {...{ form }}
                    className="flex-1 h-[calc(100vh-56.53px)] overflow-y-auto hide-scrollbar px-4 pt-4 pb-[15vh] border-x border-bright-gray"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between border-t border-bright-gray bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="text-gunmetal hover:text-gunmetal border-gunmetal font-normal"
                    >
                        Cancel
                    </Button>
                    <div className="flex items-center gap-x-4">
                        <Button
                            type="button"
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
                                                Confirm you are ready to use a Session Credit and all your Information
                                                and settings are satisfactory
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
                </div>
            </form>
        </Form>
    );
};

export default PresentationPracticeForm;
