import { create } from "zustand"
import type { Difficulty } from "../types/game.types"
import { persist } from "zustand/middleware";
import { difficulties } from "../constants/game.constants";

type GameSettingsStore = {
    difficulty: Difficulty,
    setDifficulty: (difficulty: Difficulty) => void,
}

export const useGameSettingsStore = create<GameSettingsStore>()(
    persist(
        (set) => ({
            difficulty: difficulties[1],
            setDifficulty: (difficulty: Difficulty) => set({ difficulty })
        }),
        { name: 'gameSettings' }
    )
);