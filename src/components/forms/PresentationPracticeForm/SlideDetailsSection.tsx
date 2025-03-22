import ControlledFieldWrapper from "@/components/controlled-fields/field-wrapper";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PDFViewer from "@/components/widgets/pdf-viewer";
import { cn, isPdf } from "@/lib/utils";
import { RootState } from "@/store";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormType } from ".";

interface ISlideDetatilsSectionProps extends HTMLAttributes<HTMLElement> {
    form: UseFormReturn<FormType>;
}

const SlideDetailsSection = ({ className, form }: ISlideDetatilsSectionProps) => {
    const { activeSlideIndex, slidePreviews } = useSelector((state: RootState) => state.presentationPractice);

    return (
        <section className={cn("flex flex-col gap-y-6", className)}>
            {slidePreviews.length > 0 && (
                <>
                    <h6 className="text-lg">Slide {activeSlideIndex + 1}</h6>
                    {slidePreviews.map(({ file, preview }, index) => (
                        <div
                            key={preview + index}
                            className={cn("hidden space-y-4", {
                                block: index === activeSlideIndex,
                            })}
                        >
                            <div className="w-auto h-90 rounded-lg overflow-hidden">
                                {isPdf(file) ? (
                                    <PDFViewer file={file} />
                                ) : (
                                    <img src={preview} alt="" className="object-cover size-full rounded-lg" />
                                )}
                            </div>
                            <div className="space-y-6">
                                <ControlledFieldWrapper
                                    control={form.control}
                                    name={`slidesDetails.${activeSlideIndex}.note`}
                                    label="Slide Note"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Enter your notes for this slide"
                                            className="resize-none focus-visible:ring-0 shadow-none text-gunmetal h-24.5"
                                        />
                                    )}
                                />
                                <ControlledFieldWrapper
                                    control={form.control}
                                    name={`slidesDetails.${activeSlideIndex}.time`}
                                    label="Allocate time to view this slide"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="text-gunmetal [&_svg:not([class*='text-'])]:text-gunmetal [&_svg:not([class*='text-'])]:opacity-100 h-10 focus-visible:ring-0">
                                                        <SelectValue placeholder="Select allocated time to view this slide" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="border-none">
                                                    <SelectItem value="5">5 minutes</SelectItem>
                                                    <SelectItem value="4">4 minutes</SelectItem>
                                                    <SelectItem value="3">3 minutes</SelectItem>
                                                    <SelectItem value="2">2 minutes</SelectItem>
                                                    <SelectItem value="1">1 minutes</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

export default SlideDetailsSection;
