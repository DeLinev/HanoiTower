import type { StatCardProps } from "../../types/ui.types";

export function StatCard({ value, label, color }: StatCardProps) {
    const colorClasses = {
        orange: 'bg-orange-500',
        indigo: 'bg-indigo-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500'
    };

    return (
        <div className={`${colorClasses[color]} rounded-lg p-2 flex flex-col justify-center items-center`}>
            <div className="text-4xl font-bold mb-2">
                {value}
            </div>
            <div className="font-bold">{label}</div>
        </div>
    );
}