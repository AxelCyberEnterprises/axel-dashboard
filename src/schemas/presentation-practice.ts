import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const PresentationPracticeSchema = z.object({
    files: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "File is required.")
        .refine(
            (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
            "File size must be less than 5MB.",
        )
        .refine(
            (files) => Array.from(files).every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
            "Only PNG, JPG, and PDF files are allowed.",
        ),
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
