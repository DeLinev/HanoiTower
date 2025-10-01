import type { Disk } from "../../types/game.types";

export function Disk({ disk }: { disk: Disk }) {
    const width = 20 + (disk.size * 10);
    console.log(`w-${width}`)

    // Кольори для різних розмірів дисків
    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500',
    ];

    const color = colors[disk.size - 1] || colors[0];
    
    return (
        <div
            style={{ width: `${width}%` }}
            className={`
                h-10 z-50 rounded-2xl ${color}
            `}>
            <div className="w-full h-full rounded-lg border-b-4 border-black/20" />
        </div>
    )
}