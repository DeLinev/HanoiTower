import { create } from "zustand"
import type { GameStatistic, Scoreboard } from "../types/game.types"
import { persist } from "zustand/middleware"

type ScoreboardStore = {
    scoreboard: Scoreboard,
    addRecord: (gameStat: GameStatistic, currentPlayer: string) => void,
    clearScoreboard: () => void
}

export const useScoreboardStore = create<ScoreboardStore>()(
    persist(
        (set) => ({
            scoreboard: [],
            addRecord: (gameStat: GameStatistic, currentPlayer: string) => set((state) => {
                    const playerIndex = state.scoreboard.findIndex(player => player.nickname === currentPlayer);

                    if (playerIndex !== -1) {
                        const updatedScoreboard = [...state.scoreboard];
                        updatedScoreboard[playerIndex] = {
                            ...updatedScoreboard[playerIndex],
                            gameStats: [...updatedScoreboard[playerIndex].gameStats, gameStat]
                        };
                        return { scoreboard: updatedScoreboard };
                    } else {
                        return { scoreboard: [...state.scoreboard, {
                            nickname: currentPlayer,
                            gameStats: [gameStat]
                        }]};
                    }
                }),
            clearScoreboard: () => set({ scoreboard: [] })
        }),
        { name: 'scoreboard' }
    )
);