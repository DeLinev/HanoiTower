import { useState } from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AUDIO_CREDITS = [
    {
        sound: "Disk pick up / hover",
        title: "Whoosh — Magic disappear",
        author: "Sadiquecat",
        url: "https://freesound.org/s/802472/",
        license: "Creative Commons 0",
    },
    {
        sound: "Disk drop (5 variants)",
        title: "Chess Pieces Move (Close)",
        author: "JJTaynos",
        url: "https://freesound.org/s/733927/",
        license: "Creative Commons 0",
    },
    {
        sound: "Invalid move",
        title: "Tree Hit and Scrape",
        author: "andersmmg",
        url: "https://freesound.org/s/516321/",
        license: "Attribution 4.0",
    },
    {
        sound: "Victory",
        title: "Glockenspiel bell orchestral positive UI",
        author: "ryusa",
        url: "https://freesound.org/s/531139/",
        license: "Attribution 4.0",
    },
    {
        sound: "Time up",
        title: "Chess Pieces Drop",
        author: "IENBA",
        url: "https://freesound.org/s/755250/",
        license: "Creative Commons 0",
    },
];

export function CreditsModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                title="Credits"
                aria-label="Show credits"
            >
                <InformationCircleIcon className="text-gray-300 hover:text-gray-100 transition-colors w-8 h-8 cursor-pointer" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-lg mx-4 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
                            aria-label="Close credits"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-100 mb-1">Credits</h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Audio assets sourced from{" "}
                            <a
                                href="https://freesound.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                Freesound.org
                            </a>
                        </p>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {AUDIO_CREDITS.map((credit) => (
                                <div
                                    key={credit.url}
                                    className="bg-gray-700/50 rounded-lg p-3"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <span className="text-sm font-medium text-gray-200">
                                                {credit.sound}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                &ldquo;{credit.title}&rdquo; by{" "}
                                                <a
                                                    href={credit.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    {credit.author}
                                                </a>
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap mt-0.5">
                                            {credit.license}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
