// frontend/src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import gameReducer from "./slices/gameSlice";
import reviewReducer from "./slices/reviewSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
        review: reviewReducer,
    },
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;