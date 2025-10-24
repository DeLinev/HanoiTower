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
    const [ gameSettingValue, setGameSettingValue ] = useLocalStorage<Difficulty>("gameSettings", difficulties[1]);
    const [ currentPlayer, setCurrentPlayer ] = useLocalStorage<string>("currentPlayer", "Player1");

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SettingsFormData>({
        defaultValues: { 
            nickname: currentPlayer,
            difficultyValue: gameSettingValue.value,
            isTimerOn: gameSettingValue.isTimerOn,
            customDisks: gameSettingValue.disks,
            timeLimit: gameSettingValue.timeLimit
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
            timeLimit: data.isTimerOn ? data.timeLimit : undefined
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
                                className="border-1 border-white p-1"
                                {...register("nickname", {
                                    required: 'Nickname is required',
                                    minLength: { value: 3, message: "Length of the nickname must be at least 3." },
                                    maxLength: { value: 10, message: "Length of the nickname should not exceed 10." }
                                })}
                            />
                            {errors.nickname && (
                                <p className="text-red-400">{errors.nickname.message}</p>
                            )}
                        </div>
                        <h2 className="text-center font-bold text-xl">Choose difficulty</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="customDisks">Number of disks:</label>
                            <input
                                id="customDisks"
                                type="number"
                                className="border-1 border-white p-1"
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
                                <label htmlFor="timeLimit">Time limit:</label>
                                <input 
                                    id="timeLimit" 
                                    type="number" 
                                    className="border-1 border-white p-1"
                                    {...register("timeLimit", {
                                        required: true, 
                                        min: { value: 1, message: "Time limit must be at least 1 minute." },
                                        max: { value: 3600, message: "Time limit should not exceed 60 minutes." },
                                        valueAsNumber: true
                                    })} 
                                />
                                {errors.timeLimit && (
                                    <p className="text-red-400">{errors.timeLimit.message}</p>
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