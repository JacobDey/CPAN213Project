import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addReview } from "./reviewSlice";

interface UserState {
    username: string;
    numberOfReviews: number;
}

const initialState: UserState = {
    username: "",
    numberOfReviews: 0
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.username = "";
        },
        changeNumberOfReviews: (state, action: PayloadAction<number>) => {
            state.numberOfReviews += action.payload;
        }
    }
});

export const { login, logout, changeNumberOfReviews } = userSlice.actions;

export default userSlice.reducer;