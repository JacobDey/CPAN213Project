import { createSlice } from '@reduxjs/toolkit';

// Helper function to find a review by game ID and username
interface Review {
    rating: number;
    username: string;
    gameId: number;
    review: string;
}

function findReviewByGameIdAndUsername(reviews: Review[], username: string, gameId: number): number {
    return reviews.findIndex((review) => review.gameId === gameId && review.username === username);
}

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [
      {
        rating: 5,
        username: "jacob",
        gameId: 91349,
        review: "I really like the 'Mario' character in this game.",
      },
    ],
  },
  reducers: {
    // Adds a new review to the reviews array
    addReview: (state, action) => {
      state.reviews.push(action.payload); // Use push for mutable updates with Immer
    },
    // Deletes a review by username and game ID
    deleteReview: (state, action) => {
      const { username, gameId } = action.payload;
      const index = findReviewByGameIdAndUsername(state.reviews, username, gameId);
      if (index !== -1) {
        state.reviews.splice(index, 1); // Remove the review at the found index
      }
    },
    // Edits a review by replacing the old one with the updated one
    editReview: (state, action) => {
      const { username, gameId } = action.payload;
      const index = findReviewByGameIdAndUsername(state.reviews, username, gameId);
      if (index !== -1) {
        state.reviews[index] = action.payload; // Update the review at the found index
      }
    },
  },
});

export const { addReview, deleteReview, editReview } = reviewSlice.actions;

export default reviewSlice.reducer;
