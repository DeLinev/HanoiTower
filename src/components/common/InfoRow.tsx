import type { InfoRowProps } from '../../types/ui.types';

export function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
            <span className="text-gray-300">{label}:</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}