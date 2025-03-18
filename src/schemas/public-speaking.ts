import { z } from "zod";

export const PublicSpeakingSchema = z.object({
    goals: z.array(
        z.object({
            id: z.number(),
            goal: z.string(),
        }),
    ),
    virtualEnvironment: z.string(),
    speakerNotes: z.string(),
});
