import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../layout/Layout"
import { useState } from "react";
import type { Difficulty } from "../types/game-types";
import { Button } from "../components/Button";

export function StartPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('proficient');


    const difficulties = [
        { value: 'novice' as Difficulty, label: 'Novice', disks: 3, description: '3 discs - ideal for beginners' },
        { value: 'proficient' as Difficulty, label: 'Proficient', disks: 4, description: '4 discs - classic version' },
        { value: 'expert' as Difficulty, label: 'Expert', disks: 5, description: '5 discs - for experienced players' },
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
                                <div
                                    key={diff.value}
                                    onClick={() => setSelectedDifficulty(diff.value)}
                                    className={`
                                        p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out
                                        ${selectedDifficulty === diff.value
                                            ? 'border-gray-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }
                                    `}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className={`
                                                text-xl font-semibol font-bold duration-300
                                                ${selectedDifficulty === diff.value
                                                    ? 'text-gray-800'
                                                    : 'text-gray-300'
                                                }
                                            `}>
                                                {diff.label}
                                            </h3>
                                            <p className={`
                                                text-gray-400 text-sm font-bold mt-1 transition-opacity duration-300 overflow-hidden
                                                ${selectedDifficulty === diff.value
                                                    ? 'max-h-8 opacity-100'
                                                    : 'max-h-0 opacity-0'
                                                }
                                            `}>
                                                {diff.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={() => console.log("Hello wrold!")}
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