export function AchievementMessage({ efficiency }: { efficiency: number }) {
    if (efficiency === 100) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                <p className="text-green-800 font-semibold text-center">
                    ⭐ Perfect! You solved the puzzle in the optimal way!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
            <p className="text-blue-800 text-center">
                👍 Great job! Try to reach the minimum number of moves.
            </p>
        </div>
    );
}