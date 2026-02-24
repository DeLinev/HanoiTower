import type { Meta, StoryObj } from "@storybook/react-vite";
import { GameControls } from "./GameControls";
import { MemoryRouter } from "react-router-dom";
import { useGame } from "../../hooks/useGame";
import { difficulties } from "../../constants/game.constants";
import { useGameStateStore } from "../../stores/useGameStateStore";
import { useEffect } from "react";

const meta = {
    component: GameControls,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        )
    ]
} satisfies Meta<typeof GameControls>;

export default meta;
type Story = StoryObj<typeof meta>;

const GameControlsWithHook = ({ type }: { type: "withTimer" | "withStopwatch" }) => {
    let difficulty;
    if (type === "withTimer")
        difficulty = difficulties[1];
    else
        difficulty = difficulties[0];

    const {
        timePassed,
        timeRemaining,
        isTimerRunning,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGame(difficulty, () => { });

    const incrementMoves = useGameStateStore(state => state.incrementMoves);
    const moves = Math.random() * 15 + 5;
    useEffect(() => {
        for (let i = 0; i < moves; i++) {
            incrementMoves();
        }
    }, []);
    

    return (
        <GameControls
            timePassed={timePassed}
            timeRemaining={timeRemaining}
            isTimerRunning={isTimerRunning}
            onReset={resetGame}
            onPause={pauseGame}
            onResume={resumeGame}
        />
    )
}

const requiredArgs = {
    timePassed: 0,
    timeRemaining: null,
    isTimerRunning: false,
    onReset: () => { },
    onPause: () => { },
    onResume: () => { },
}

export const WithTimer: Story = {
    render: () => <GameControlsWithHook type="withTimer" />,
    args: requiredArgs
};

export const WithStopwatch: Story = {
    render: () => <GameControlsWithHook type="withStopwatch" />,
    args: requiredArgs
};