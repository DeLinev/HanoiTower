import { useAudioStore } from "../../stores/useAudioStore";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

export function MuteToggle() {
    const isMuted = useAudioStore((s) => s.isMuted);
    const toggleMute = useAudioStore((s) => s.toggleMute);

    const Icon = isMuted ? SpeakerXMarkIcon : SpeakerWaveIcon;
    const label = isMuted ? "Unmute audio" : "Mute audio";

    return (
        <button onClick={toggleMute} title={label} aria-label={label}>
            <Icon className="text-gray-300 hover:text-gray-100 transition-colors w-8 h-8 cursor-pointer" />
        </button>
    );
}
