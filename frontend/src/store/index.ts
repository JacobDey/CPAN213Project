import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/slice/gameSlice";
import reviewReducer from "@/slice/reviewSlice";
import userReducer from "@/slice/userSlice";

const store = configureStore({
    reducer: {
        game: gameReducer,
        review: reviewReducer,
        user: userReducer,
    },
});

export default store;