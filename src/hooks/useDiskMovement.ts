import type { Tower } from "../types/game.types";

function moveDisk(towers: Tower[], fromTowerId: number, toTowerId: number) {
    const towersCopy = structuredClone(towers);

    const fromTower = towersCopy.find(tower => tower.id === fromTowerId);
    const toTower = towersCopy.find(tower => tower.id === toTowerId);

    if (!fromTower && !toTower) return towers;

    const disk = fromTower!.disks.pop();

    if (disk) {
        toTower!.disks.push(disk);
    }

    return towersCopy;
}

function getTopDisk(tower: Tower) {
    if (tower.disks.length === 0) return null;
    return tower.disks.at(-1);
}

function getDiskCount(tower: Tower) {
    return tower.disks.length;
};

export function useDiskMovement() {
    return {
        moveDisk,
        getTopDisk,
        getDiskCount
    }
}