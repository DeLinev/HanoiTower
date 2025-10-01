import type { CardType } from "../../types/ui.types";

export function Card({ children, Icon, title } : CardType) {
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
            {
                (Icon || title) &&
                <div className="flex items-center gap-1">
                    {
                        Icon &&
                        <Icon className="text-gray-300 w-8 h-8" />
                    }
                    <h1 className="font-serif text-3xl">{title}</h1>
                </div>
            }           
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}