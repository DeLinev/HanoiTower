import { create } from "zustand";
import { persist } from "zustand/middleware";

const AUDIO_BASE_PATH = "/audio/";
const DROP_VARIANTS = 5;

type SoundName =
    | "diskPickUp"
    | "diskDrop"
    | "invalidMove"
    | "victory"
    | "timeUp";

const SOUND_FILES: Record<Exclude<SoundName, "diskDrop">, string> = {
    diskPickUp: "disk-pick-up-or-hover-follow.mp3",
    invalidMove: "invalid-move.mp3",
    victory: "victory.mp3",
    timeUp: "time-up.mp3",
};

type AudioState = {
    isMuted: boolean;
    toggleMute: () => void;
};

export const useAudioStore = create<AudioState>()(
    persist(
        (set) => ({
            isMuted: false,
            toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
        }),
        { name: "audioSettings" },
    ),
);

const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(filename: string): HTMLAudioElement {
    let audio = audioCache.get(filename);
    if (!audio) {
        audio = new Audio(AUDIO_BASE_PATH + filename);
        audioCache.set(filename, audio);
    }
    return audio;
}

function pickRandomDropFile(): string {
    const index = Math.floor(Math.random() * DROP_VARIANTS) + 1;
    return `disk-drop-${index}.mp3`;
}

export function playSound(name: SoundName) {
    if (useAudioStore.getState().isMuted) return;

    const filename = name === "diskDrop"
        ? pickRandomDropFile()
        : SOUND_FILES[name];

    const audio = getAudio(filename);

    // Restart the clip if it's already playing
    audio.currentTime = 0;
    audio.play().catch(() => {
        // Browser autoplay policy blocks playback before user interaction.
        // Silently swallow — the first user click/key "unlocks" the AudioContext.
    });
}

export function preloadAllSounds() {
    Object.values(SOUND_FILES).forEach((f) => getAudio(f));
    for (let i = 1; i <= DROP_VARIANTS; i++) {
        getAudio(`disk-drop-${i}.mp3`);
    }
}
