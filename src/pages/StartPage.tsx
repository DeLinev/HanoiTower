import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../components/layout/Layout"
import { useState } from "react";
import type { Difficulty } from "../types/game.types";
import { Button } from "../components/common/Button";
import { DifficultyOption } from "../components/common/DifficultyOption";
import { difficulties } from "../constants/game.constants";
import { Card } from "../components/common/Card";
import useLocalStorage from "../hooks/useLocalStorage";

export function StartPage({ onGameStart }: { onGameStart: (selectedDifficulty: Difficulty) => void }) {
    const { storedValue, setValue } = useLocalStorage("gameSettings", { difficulty: difficulties[1] });
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(storedValue.difficulty);

    const handleClick = () => {
        setValue({ difficulty: selectedDifficulty })
        onGameStart(selectedDifficulty)
    }

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
                        onClick={handleClick}
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