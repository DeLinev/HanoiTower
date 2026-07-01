import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useGameStateStore } from "../../stores/useGameStateStore";
import { playSound } from "../../stores/useAudioStore";

const LIFT_Y = 14;

export type GameKeyboardControlsProps = {
    onTowerSelect: (towerId: number) => void;
    onDiskDrop: (fromTowerId: number, toTowerId: number) => void;
    canDropOnTower: (fromTowerId: number, toTowerId: number) => boolean;
    isGameActive: boolean;
    towerPositions: [number, number, number][];
    getDropTargetY: (towerId: number) => number;
    focusedTower: number;
    onFocusedTowerChange: (towerId: number) => void;
    onKeyboardActivity: () => void;
};

export function GameKeyboardControls({
    onTowerSelect,
    onDiskDrop,
    canDropOnTower,
    isGameActive,
    towerPositions,
    getDropTargetY,
    focusedTower,
    onFocusedTowerChange,
    onKeyboardActivity,
}: GameKeyboardControlsProps) {
    const gameState = useGameStateStore(s => s.gameState);
    const towerCount = gameState.towers.length;

    // Refs keep the latest values accessible inside the keydown closure
    // without re-registering the listener on every state change.
    const stateRef = useRef(gameState);
    stateRef.current = gameState;

    const activeRef = useRef(isGameActive);
    activeRef.current = isGameActive;

    const focusRef = useRef(focusedTower);
    focusRef.current = focusedTower;

    const posRef = useRef(towerPositions);
    posRef.current = towerPositions;

    const dropYRef = useRef(getDropTargetY);
    dropYRef.current = getDropTargetY;

    const canDropRef = useRef(canDropOnTower);
    canDropRef.current = canDropOnTower;

    const onDropRef = useRef(onDiskDrop);
    onDropRef.current = onDiskDrop;

    const onSelectRef = useRef(onTowerSelect);
    onSelectRef.current = onTowerSelect;

    const onFocusRef = useRef(onFocusedTowerChange);
    onFocusRef.current = onFocusedTowerChange;

    const onKbRef = useRef(onKeyboardActivity);
    onKbRef.current = onKeyboardActivity;

    const hoveringFrom = useRef<number | null>(null);
    const hoveringDiskId = useRef<number | null>(null);

    const emit = useCallback(
        (name: string, detail: Record<string, unknown>) =>
            window.dispatchEvent(new CustomEvent(name, { detail })),
        [],
    );

    const liftDisk = useCallback((towerId: number) => {
        const tower = stateRef.current.towers[towerId];
        if (!tower || tower.disks.length === 0) return;

        const topDisk = tower.disks[tower.disks.length - 1];

        hoveringFrom.current = towerId;
        hoveringDiskId.current = topDisk.id;

        emit("kb-disk-lift", {
            diskId: topDisk.id,
            targetX: posRef.current[towerId][0],
            liftY: LIFT_Y,
        });

        playSound("diskPickUp");
        onSelectRef.current(towerId);
    }, [emit]);

    const followFocus = useCallback((towerId: number) => {
        if (hoveringDiskId.current === null) return;
        emit("kb-disk-follow", {
            diskId: hoveringDiskId.current,
            targetX: posRef.current[towerId][0],
        });
        playSound("diskPickUp");
    }, [emit]);

    const dropDisk = useCallback((toTowerId: number) => {
        const diskId = hoveringDiskId.current;
        const fromId = hoveringFrom.current;
        if (diskId === null || fromId === null) return;

        const toX = posRef.current[toTowerId][0];
        const dropY = dropYRef.current(toTowerId);

        emit("kb-disk-drop", {
            diskId,
            fromTowerId: fromId,
            toTowerId,
            waypoints: [
                new THREE.Vector3(toX, LIFT_Y, 0),
                new THREE.Vector3(toX, dropY, 0),
            ],
        });

        playSound("diskDrop");

        hoveringFrom.current = null;
        hoveringDiskId.current = null;
    }, [emit]);

    const cancelHover = useCallback(() => {
        const diskId = hoveringDiskId.current;
        const fromId = hoveringFrom.current;
        if (diskId === null || fromId === null) return;

        emit("kb-disk-cancel", { diskId });
        // Re-selecting the same tower toggles it off in handleTowerSelect
        onSelectRef.current(fromId);

        hoveringFrom.current = null;
        hoveringDiskId.current = null;
    }, [emit]);

    const shakeDisk = useCallback(() => {
        if (hoveringDiskId.current === null) return;
        emit("kb-disk-shake", { diskId: hoveringDiskId.current });
        playSound("invalidMove");
    }, [emit]);

    // Cancel the keyboard hover when the user switches to mouse
    useEffect(() => {
        const onMouse = () => {
            if (hoveringFrom.current !== null) cancelHover();
        };
        window.addEventListener("mousedown", onMouse);
        return () => window.removeEventListener("mousedown", onMouse);
    }, [cancelHover]);

    // Cancel hover if the game ends mid-interaction (timer, win, etc.)
    useEffect(() => {
        if (!isGameActive && hoveringFrom.current !== null) cancelHover();
    }, [isGameActive, cancelHover]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!activeRef.current) return;
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;

            const focus = focusRef.current;
            const isHovering = hoveringFrom.current !== null;

            switch (e.key) {
                case "Tab":
                case "ArrowLeft":
                case "ArrowRight": {
                    e.preventDefault();
                    onKbRef.current();

                    const direction =
                        e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)
                            ? -1 : 1;
                    const next = (focus + direction + towerCount) % towerCount;
                    onFocusRef.current(next);

                    if (isHovering) followFocus(next);
                    break;
                }

                case "Enter":
                case " ": {
                    e.preventDefault();
                    onKbRef.current();

                    if (isHovering) {
                        const fromId = hoveringFrom.current!;
                        if (focus === fromId) {
                            cancelHover();
                        } else if (canDropRef.current(fromId, focus)) {
                            dropDisk(focus);
                        } else {
                            shakeDisk();
                        }
                    } else {
                        const tower = stateRef.current.towers[focus];
                        if (tower && tower.disks.length > 0) liftDisk(focus);
                    }
                    break;
                }

                case "1":
                case "2":
                case "3": {
                    const towerId = parseInt(e.key) - 1;
                    if (towerId >= towerCount) break;
                    onKbRef.current();
                    onFocusRef.current(towerId);

                    if (isHovering) {
                        const fromId = hoveringFrom.current!;
                        if (towerId === fromId) {
                            cancelHover();
                        } else {
                            followFocus(towerId);
                            if (canDropRef.current(fromId, towerId)) {
                                dropDisk(towerId);
                            } else {
                                shakeDisk();
                            }
                        }
                    } else {
                        const tower = stateRef.current.towers[towerId];
                        if (tower && tower.disks.length > 0) liftDisk(towerId);
                    }
                    break;
                }

                case "Escape": {
                    onKbRef.current();
                    if (isHovering) cancelHover();
                    break;
                }
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [towerCount, cancelHover, liftDisk, followFocus, dropDisk, shakeDisk]);

    return null;
}
