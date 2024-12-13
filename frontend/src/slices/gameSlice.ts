import { Game } from "@constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    currentGame: Game | null;
}

const initialState: GameState = {
    currentGame: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<Game>) => {
            state.currentGame = action.payload;
        },
        clearGame: (state) => {
            state.currentGame = null;
        },
    },
});

export const { setGame, clearGame } = gameSlice.actions;

export default gameSlice.reducer;
