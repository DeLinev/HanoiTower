import type { Tower } from "../types/game.types";

function canSelectTower(tower: Tower) {
    return tower.disks.length > 0;
}

function canMoveDisk(fromT: Tower, toT: Tower) {
    if (fromT.disks.length === 0) return false;
    if (toT.disks.length === 0) return true;

    const movingDisk = fromT.disks.at(-1);
    const targetDisk = toT.disks.at(-1);

    return targetDisk!.size < movingDisk!.size;
}

function checkWin(towers: Tower[], maxDiskCount: number) {
    if (towers.length === 0) return false;

    const lastTower = towers.at(-1);

    return lastTower!.disks.length === maxDiskCount;
}

function getMinMoves(disksCount: number) {
    return Math.pow(2, disksCount) - 1;
}

export function useGameValidation() {
    return {
        canSelectTower,
        canMoveDisk,
        checkWin,
        getMinMoves
    }
}