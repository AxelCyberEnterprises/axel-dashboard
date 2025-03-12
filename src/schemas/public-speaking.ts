import { z } from "zod";

export const PublicSpeakingSchema = z.object({
    speechPhases: z.array(
        z.object({
            id: z.number(),
            phaseName: z.string(),
        }),
    ),
    virtualEnvironment: z.string(),
    inputSpeakerNotes: z.object({
        introductionNotes: z.string(),
        bodyPhaseNotes: z.string(),
        conclusionNotes: z.string(),
    }),
    timeAllocation: z.object({
        introductionTime: z.array(z.number()),
        bodyPhaseTime: z.array(z.number()),
        conclusionTime: z.array(z.number()),
    }),
});
