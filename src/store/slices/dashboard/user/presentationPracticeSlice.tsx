import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPresentationPractice {
    activeSlideIndex: number;
    slidePreviews: string[];
}

const initialState: IPresentationPractice = {
    activeSlideIndex: 0,
    slidePreviews: [],
};

const presentationPracticeSlice = createSlice({
    name: "presentation-practice",
    initialState,
    reducers: {
        setActiveSlideIndex: (state, action: PayloadAction<number>) => {
            state.activeSlideIndex = action.payload;
        },
        setslidePreviews: (state, action: PayloadAction<string[]>) => {
            state.slidePreviews = action.payload;
        },
    },
});

export const { setActiveSlideIndex, setslidePreviews } = presentationPracticeSlice.actions;
export default presentationPracticeSlice.reducer;
