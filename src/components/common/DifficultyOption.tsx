import type { DifficultyType } from "../../types/ui.types";

export function DifficultyOption({ diff, setSelectedDifficulty, selectedDifficulty }: DifficultyType) {
    return (
    <div
        key={diff.value}
        onClick={() => setSelectedDifficulty(diff.value)}
        className={`
            p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out
            ${selectedDifficulty === diff.value
                ? 'border-gray-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'}
        `}>
        <div className="flex items-center justify-between">
            <div>
                <h3 className={`
                    text-xl font-semibol font-bold duration-300
                    ${selectedDifficulty === diff.value
                        ? 'text-gray-800'
                        : 'text-gray-300'}
                `}>
                    {diff.label}
                </h3>
                <p className={`
                    text-gray-400 text-sm font-bold mt-1 transition-opacity duration-300 overflow-hidden
                    ${selectedDifficulty === diff.value
                        ? 'max-h-8 opacity-100'
                        : 'max-h-0 opacity-0'}
                `}>
                    {diff.description}
                </p>
            </div>
        </div>
    </div>
)}