import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { Layout } from "../components/layout/Layout"
import type { Difficulty, SettingsFormData } from "../types/game.types";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import useLocalStorage from "../hooks/useLocalStorage";
import { useForm } from "react-hook-form";


export function StartPage({ onGameStart }: { onGameStart: (selectedDifficulty: Difficulty) => void }) {
    const { storedValue, setValue } = useLocalStorage<SettingsFormData>("gameSettings", { 
        difficultyValue: "custom", 
        customDisks: 3,  
        timeLimit: 120, 
        isTimerOn: true 
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SettingsFormData>({
        defaultValues: { ...storedValue }
    });

    const isTimerOn = watch("isTimerOn");

    const onFormSubmit = (data: SettingsFormData) => {
        setValue({ ...data });
        const selectedDifficulty: Difficulty = {
            value: "custom",
            label: "Custom",
            disks: data.customDisks,
            description: "Custom difficulty",
            isTimerOn: data.isTimerOn,
            timeLimit: data.isTimerOn ? data.timeLimit : null
        }

        onGameStart(selectedDifficulty);
    }

    return (
        <>
            <Layout>
                <Card Icon={Cog6ToothIcon} title="Game Settings">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                        <h2 className="text-center font-bold text-xl">Choose difficulty</h2>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="customDisks">Number of disks:</label>
                            <input
                                id="customDisks"
                                type="number"
                                className="border-1 border-white p-1"
                                {...register("customDisks", {
                                    required: 'Age is required',
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
            </Layout>
        </>
    )
}