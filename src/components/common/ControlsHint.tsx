import { useState } from "react";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";

export function ControlsHint() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ComputerDesktopIcon
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="text-gray-300 hover:text-gray-100 transition-colors w-8 h-8"
                title="Controls"
                aria-label="Show controls"
            />

            {isOpen && (
                <div className="absolute right-0 top-12 w-96 p-5 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl z-50">
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Controls</h3>

                    <Section title="🎮 Game — Mouse">
                        <Row keys="Left click + drag" action="Drag a disk" />
                        <Row keys="Left click tower" action="Select / place disk" />
                    </Section>

                    <Section title="⌨️ Game — Keyboard">
                        <Row keys="Tab / ← →" action="Cycle tower focus" />
                        <Row keys="Enter / Space" action="Pick up / drop disk" />
                        <Row keys="1  2  3" action="Jump to tower + select" />
                        <Row keys="Escape" action="Cancel move" />
                    </Section>

                    <Section title="📷 Camera">
                        <Row keys="W A S D" action="Orbit (rotate)" />
                        <Row keys="Q / E" action="Pan left / right" />
                        <Row keys="Z / X" action="Pan up / down" />
                        <Row keys="+ / −" action="Zoom in / out" />
                        <Row keys="Scroll wheel" action="Zoom in / out" />
                        <Row keys="Middle click + drag" action="Orbit (rotate)" />
                        <Row keys="Right click + drag" action="Pan" />
                        <Row keys="Home / R" action="Reset camera" />
                    </Section>
                </div>
            )}
        </>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-4 last:mb-0">
            <h4 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">{title}</h4>
            <div className="space-y-1.5">{children}</div>
        </div>
    );
}

function Row({ keys, action }: { keys: string; action: string }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-300">{action}</span>
            <kbd className="text-xs font-mono bg-gray-700 text-gray-300 px-2 py-0.5 rounded border border-gray-600 whitespace-nowrap">
                {keys}
            </kbd>
        </div>
    );
}
