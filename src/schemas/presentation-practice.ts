import { z } from "zod";
import { MediaSchema } from "./media-schema";

export const PresentationPracticeSchema = z.object({
    slides: MediaSchema,
    slidesDetails: z.array(
        z.object({
            note: z.string().optional(),
            time: z.number().optional(),
        }),
    ),
    transitionType: z.enum(["fade", "slide", "none"]),
    allocatedTime: z.number().int().positive(),
    totalAllocatedTime: z.number().int().positive(),
});
