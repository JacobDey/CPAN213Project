import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/slice/gameSlice";
import reviewReducer from "@/slice/reviewSlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
        review: reviewReducer,
    },
});

export default store;