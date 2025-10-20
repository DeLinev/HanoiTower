import { useState } from "react";

export function useTowerSelection() {
    const [selectedTower, setSelectedTower] = useState<number | null>(null);

    const selectTower = (towerId: number) => { setSelectedTower(towerId) };
    const deselectTower = () => { setSelectedTower(null) };
    const toggleTower = (towerId: number) => { setSelectedTower(currentT => currentT === towerId ? null : towerId) };
    const isTowerSelected = (towerId: number) => selectedTower === towerId;

    return {
        selectedTower,
        selectTower,
        deselectTower,
        toggleTower,
        isTowerSelected
    };
}