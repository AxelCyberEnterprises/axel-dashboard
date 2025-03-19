import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const FileWithPreviewSchema = z.object({
    file: z.instanceof(File),
    preview: z.string().url(),
});

export const PresentationPracticeSchema = z.object({
    slides: z
        .array(FileWithPreviewSchema)
        .refine((files) => files.length > 0, "File is required.")
        .refine(
            (files) => files.every((fileWithPreview) => fileWithPreview.file.size <= MAX_FILE_SIZE),
            "File size must be less than 5MB.",
        )
        .refine(
            (files) => files.every((fileWithPreview) => ACCEPTED_FILE_TYPES.includes(fileWithPreview.file.type)),
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
