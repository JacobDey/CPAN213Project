import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "@constants/types";

interface ReviewState {
    reviews: Review[];
}

const initialState: ReviewState = {
    reviews: [],
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload);
        },
        deleteReview: (state, action: PayloadAction<number>) => {
            state.reviews.splice(action.payload, 1);
        },
        clearReviews: (state) => {
            state.reviews = [];
        },
    },
});

export const { addReview, deleteReview, clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
