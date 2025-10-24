import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../components/layout/Layout"
import type { Difficulty, SettingsFormData } from "../types/game.types";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import useLocalStorage from "../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { difficulties } from "../constants/game.constants";


export function StartPage() {
    const navigate = useNavigate();
    const [gameSettingValue, setGameSettingValue] = useLocalStorage<Difficulty>("gameSettings", difficulties[1]);
    const [currentPlayer, setCurrentPlayer] = useLocalStorage<string>("currentPlayer", "Player1");

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SettingsFormData>({
        defaultValues: {
            nickname: currentPlayer,
            difficultyValue: gameSettingValue.value,
            isTimerOn: gameSettingValue.isTimerOn,
            customDisks: gameSettingValue.disks,
            timeLimitMin: Math.floor((gameSettingValue.timeLimit ?? 0) / 60),
            timeLimitSec: (gameSettingValue.timeLimit ?? 0) % 60
        }
    });

    const isTimerOn = watch("isTimerOn");

    const onFormSubmit = (data: SettingsFormData) => {
        const selectedDifficulty: Difficulty = {
            value: "custom",
            label: "Custom",
            disks: data.customDisks,
            description: "Custom difficulty",
            isTimerOn: data.isTimerOn,
            timeLimit: data.isTimerOn ? data.timeLimitMin * 60 + data.timeLimitSec : undefined
        }

        setGameSettingValue(selectedDifficulty);
        setCurrentPlayer(data.nickname);
        navigate('/game');
    }

    return (
        <>
            <Layout>
                <Card Icon={Cog6ToothIcon} title="Game Settings">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                id="nickname"
                                className="px-3 py-1.5 rounded-lg outline-2 outline-offset-1 outline-white/10 focus:outline-blue-600"
                                {...register("nickname", {
                                    required: 'Nickname is required',
                                    minLength: { value: 3, message: "Length of the nickname must be at least 3." },
                                    maxLength: { value: 10, message: "Length of the nickname should not exceed 10." },
                                    pattern: {
                                        value: /^[A-Za-z0-9_]+$/,
                                        message: "Nickname may only contain letters, numbers and underscores."
                                    }
                                })}
                            />
                            {errors.nickname && (
                                <p className="text-red-400">{errors.nickname.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="customDisks">Number of disks:</label>
                            <input
                                id="customDisks"
                                type="number"
                                className="px-3 py-1.5 rounded-lg outline-2 outline-offset-1 outline-white/10 focus:outline-blue-600"
                                {...register("customDisks", {
                                    required: 'Number of disks is required',
                                    min: { value: 3, message: "Number of disks must be at least 3." },
                                    max: { value: 10, message: "Number of disks should not exceed 10." },
                                    valueAsNumber: true
                                })}
                            />
                            {errors.customDisks && (
                                <p className="text-red-400">{errors.customDisks.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="isTimerOn"
                                type="checkbox"
                                className="mr-1"
                                {...register("isTimerOn")}
                            />
                            <label htmlFor="isTimerOn">Turn on time limit?</label>
                            {errors.isTimerOn && (
                                <p className="text-red-400">{errors.isTimerOn.message}</p>
                            )}
                        </div>

                        {isTimerOn && (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="timeLimitMin">Time limit:</label>
                                <div className="flex gap-2 items-baseline">
                                    <input
                                        id="timeLimitMin"
                                        type="number"
                                        className="w-15 px-3 py-1.5 rounded-lg outline-2 outline-offset-1 outline-white/10 focus:outline-blue-600"
                                        {...register("timeLimitMin", {
                                            required: true,
                                            min: { value: 0, message: "Minutes time limit should not be negative." },
                                            max: { value: 60, message: "Minutes time limit should not exceed 60 minutes." },
                                            valueAsNumber: true
                                        })}
                                    />
                                    <div className="font-bold">m</div>
                                    <div className="mx-3 font-bold">:</div>
                                    <input
                                        id="timeLimitSec"
                                        type="number"
                                        className="w-15 px-3 py-1.5 rounded-lg outline-2 outline-offset-1 outline-white/10 focus:outline-blue-600"
                                        {...register("timeLimitSec", {
                                            required: true,
                                            min: { value: 0, message: "Seconds time limit should not be negative." },
                                            max: { value: 60, message: "Seconds time limit should not exceed 59 seconds." },
                                            valueAsNumber: true
                                        })}
                                    />
                                    <div className="font-bold">s</div>
                                </div>
                                {errors.timeLimitMin && (
                                    <p className="text-red-400">{errors.timeLimitMin.message}</p>
                                )}
                                {errors.timeLimitSec && (
                                    <p className="text-red-400">{errors.timeLimitSec.message}</p>
                                )}
                            </div>
                        )}

                        <Button
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            Start Game
                        </Button>
                    </form>
                </Card>
                <Button
                    onClick={() => navigate("/scoreboard")}
                    variant="secondary"
                >
                    Scoreboard
                </Button>
            </Layout>
        </>
    )
}