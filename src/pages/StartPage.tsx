import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../components/layout/Layout"
import { useState } from "react";
import type { Difficulty } from "../types/game.types";
import { Button } from "../components/common/Button";
import { DifficultyOption } from "../components/common/DifficultyOption";
import { difficulties } from "../constants/game.constants";
import { Card } from "../components/common/Card";

export function StartPage({ onGameStart }: { onGameStart: (selectedDifficulty: Difficulty) => void }) {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulties[1]);

    return (
        <>
            <Layout>
                <Card Icon={Cog6ToothIcon} title="Game Settings">
                    <h2 className="text-center font-bold text-xl">Choose difficulty</h2>
                    <div className="grid gap-4">
                        {difficulties.map((diff) => (
                            <DifficultyOption key={diff.disks} diff={diff} setSelectedDifficulty={setSelectedDifficulty} selectedDifficulty={selectedDifficulty} />
                        ))}
                    </div>
                    <Button
                        onClick={() => onGameStart(selectedDifficulty)}
                        variant="primary"
                        size="large"
                        fullWidth
                    >
                        Start Game
                    </Button>
                </Card>
            </Layout>
        </>
    )
}