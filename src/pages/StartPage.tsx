import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../components/layout/Layout"
import { useState } from "react";
import type { Difficulty, DifficultyLevel } from "../types/game.types";
import { Button } from "../components/common/Button";
import { DifficultyOption } from "../components/common/DifficultyOption";

export function StartPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('proficient');

    const difficulties: Difficulty[] = [
        { value: 'novice' as DifficultyLevel, label: 'Novice', disks: 3, description: '3 discs - ideal for beginners' },
        { value: 'proficient' as DifficultyLevel, label: 'Proficient', disks: 4, description: '4 discs - classic version' },
        { value: 'expert' as DifficultyLevel, label: 'Expert', disks: 5, description: '5 discs - for experienced players' },
    ];

    return (
        <>
            <Layout>
                <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
                    <div className="flex items-center gap-1">
                        <Cog6ToothIcon className="text-gray-300 w-8 h-8" />
                        <h1 className="font-serif text-3xl">Game Settings</h1>
                    </div>
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-4">
                        <h2 className="text-center font-bold text-xl">Choose difficulty</h2>
                        <div className="grid gap-4">
                            {difficulties.map((diff) => (
                                <DifficultyOption key={diff.disks} diff={diff} setSelectedDifficulty={setSelectedDifficulty} selectedDifficulty={selectedDifficulty} />
                            ))}
                        </div>
                        <Button
                            onClick={() => console.log(selectedDifficulty)}
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            Start Game
                        </Button>
                    </div>
                </div>
            </Layout>
        </>
    )
}