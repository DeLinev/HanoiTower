import type { ReactNode } from "react";
import { useState } from "react";
import Logo from "../../assets/logo.svg"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export function Layout({ children }: { children: ReactNode }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
        <div className="h-screen flex flex-col">
            <header className="relative flex items-center justify-center p-3 border-b border-gray-700">
                <div className="flex flex-row items-center gap-2">
                    <img src={Logo} alt="Hanoi Tower Logo" className="w-8 h-8" />
                    <h1 className="text-2xl font-bold text-gray-300">Tower of Hanoi</h1>
                </div>
                <div className="absolute right-3">
                    <QuestionMarkCircleIcon 
                        className="text-gray-300 hover:text-gray-400 w-8 h-8"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    />
                    {showTooltip && (
                        <div className="absolute right-10 top-0 w-80 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">Tower of Hanoi Rules</h3>
                            <div className="text-sm text-gray-300 space-y-2">
                                <p><strong>Objective:</strong> Move all disks from the first rod to the third rod.</p>
                                <p><strong>Rules:</strong></p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Only one disk can be moved at a time</li>
                                    <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack</li>
                                    <li>No disk may be placed on top of a disk that is smaller than it</li>
                                </ul>
                                <p className="italic">Try to solve it in the minimum number of moves: 2ⁿ - 1 (where n is the number of disks)</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
        </>
    )
}