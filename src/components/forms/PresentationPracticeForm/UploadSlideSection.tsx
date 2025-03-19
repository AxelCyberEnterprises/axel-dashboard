import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadMediaTrigger from "@/components/widgets/UploadMediaTrigger";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { setActiveSlideIndex } from "@/store/slices/dashboard/user/presentationPracticeSlice";
import { Plus, UploadCloud } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormType } from ".";

interface IUploadSlideSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const UploadSlideSection = ({ className, form }: IUploadSlideSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.presentationPractice);
    const dispatch = useDispatch();

    const filesRegister = form.register("files");

    const handleSlideClick = useCallback(
        (index: number) => {
            dispatch(setActiveSlideIndex(index));
        },
        [dispatch],
    );

    return (
        <>
            <section className={cn("lg:flex flex-col hidden gap-y-4", className)}>
                <h6 className="text-lg">Upload slides</h6>
                <div className="space-y-6">
                    <ControlledFieldWrapper
                        control={form.control}
                        name="files"
                        render={() => (
                            <UploadMediaTrigger
                                filesRegister={filesRegister}
                                isMultiple
                                className="flex flex-col gap-y-3 p-4 items-center bg-ghost-white text-sm text-independence rounded-lg"
                            >
                                <UploadCloud className="size-5 text-gunmetal" />
                                <span className="text-center">
                                    Drag and drop slides here
                                    <br /> PNG, JPG, PDF (max. 800x400px)
                                </span>
                                <span>Or</span>
                                <Button
                                    type="button"
                                    className="bg-green-sheen hover:bg-green-sheen/80 transition-colors"
                                >
                                    Upload Slide
                                </Button>
                            </UploadMediaTrigger>
                        )}
                    />
                    {slidePreviews.length > 0 && (
                        <>
                            <Separator className="bg-bright-gray" />
                            <div className="space-y-5">
                                <h6 className="text-lg">Uploaded Slides ({slidePreviews.length})</h6>
                                <div className="flex flex-col gap-y-3">
                                    {slidePreviews.map((preview, i) => (
                                        <div
                                            key={preview + i}
                                            className="flex items-start gap-x-3 cursor-pointer"
                                            onClick={() => handleSlideClick(i)}
                                        >
                                            <span className="text-sm">{i + 1}</span>
                                            <div className="w-full h-24">
                                                <img
                                                    src={preview}
                                                    alt="slide"
                                                    className={cn("object-cover size-full rounded-md", {
                                                        "border-2 border-gunmetal": i === activeSlideIndex,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section className="lg:hidden absolute bottom-0 inset-x-0 p-4 flex items-start gap-x-3 border-t border-bright-gray bg-white overflow-auto hide-scrollbar">
                <div className="flex flex-col gap-y-2 whitespace-nowrap">
                    <span className="text-sm text-center">Upload New slide</span>
                    <ControlledFieldWrapper
                        control={form.control}
                        name="files"
                        render={() => (
                            <UploadMediaTrigger
                                filesRegister={filesRegister}
                                isMultiple
                                className="w-42.5 h-24 grid place-content-center bg-ghost-white rounded-lg cursor-pointer border border-bright-gray"
                            >
                                <Plus className="size-5" />
                            </UploadMediaTrigger>
                        )}
                    />
                </div>
                {slidePreviews.map((preview, i) => (
                    <div
                        key={preview + i}
                        className="flex flex-col items-start gap-y-2 cursor-pointer"
                        onClick={() => handleSlideClick(i)}
                    >
                        <span className="text-sm">{i + 1}</span>
                        <div className="w-42.5 h-24">
                            <img
                                src={preview}
                                alt="slide"
                                className={cn("object-cover size-full rounded-md", {
                                    "border-2 border-gunmetal": i === activeSlideIndex,
                                })}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default UploadSlideSection;
