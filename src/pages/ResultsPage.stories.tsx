import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResultsPage } from "./ResultsPage";
import { MemoryRouter } from "react-router-dom";
import type { GameStatistic } from "../types/game.types";
import { difficulties } from "../constants/game.constants";

const meta = {
    component: ResultsPage,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/results"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof ResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const [novice, proficient, expert] = difficulties;

const wonStopwatchStats: GameStatistic = {
    isGameWon: true,
    difficulty: novice,
    movesCount: 11,
    minMoves: 7,
    timePassed: 45,
    timeRemaining: null,
    efficiency: 64,
};

export const WonWithStopwatch: Story = {
    args: {
        gameStatistic: wonStopwatchStats,
        onPlayAgain: () => alert('Play Again clicked!'),
    },
};

const wonTimerStats: GameStatistic = {
    isGameWon: true,
    difficulty: proficient,
    movesCount: 20,
    minMoves: 15,
    timePassed: 85,
    timeRemaining: 35,
    efficiency: 75,
};

export const WonWithTimer: Story = {
    args: {
        gameStatistic: wonTimerStats,
        onPlayAgain: () => alert('Play Again clicked!'),
    },
};

const perfectStats: GameStatistic = {
    isGameWon: true,
    difficulty: proficient,
    movesCount: 15,
    minMoves: 15,
    timePassed: 62,
    timeRemaining: 58,
    efficiency: 100,
};

export const PerfectVictory: Story = {
    args: {
        gameStatistic: perfectStats,
        onPlayAgain: () => alert('Play Again clicked!'),
    },
};

const lostTimeUpStats: GameStatistic = {
    isGameWon: false,
    difficulty: expert,
    movesCount: 22,
    minMoves: 31,
    timePassed: 180,
    timeRemaining: 0,
    efficiency: 0,
};

export const LostTimeUp: Story = {
    args: {
        gameStatistic: lostTimeUpStats,
        onPlayAgain: () => alert('Play Again clicked!'),
    },
};