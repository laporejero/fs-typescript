import { useState } from "react";
import type { Visibility, Weather } from "../types";

interface AddNewEntryProps {
    diaryEntryCreation: (
        date: string,
        visibility: Visibility,
        weather: Weather,
        comment: string
    ) => void
}

const AddNewEntry = ({ diaryEntryCreation }: AddNewEntryProps) => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<Visibility | ''>('')
    const [weather, setWeather] = useState<Weather | ''>('')
    const [comment, setComment] = useState<string>('')

    const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"]
    const weatherOptions: Weather[] = ["sunny", "rainy", "cloudy", "stormy", "windy"]

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={(event) => {
                    event.preventDefault()
                    if (!visibility || !weather) return
                    diaryEntryCreation(date, visibility, weather, comment)
                    setDate('')
                    setVisibility('')
                    setWeather('')
                    setComment('')
                }}
            >
                <label>
                    date
                    <input
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    visibility
                    {visibilityOptions.map(option => (
                        <label key={option} style={{ marginLeft: '10px' }}>
                            {option}
                            <input 
                                type="radio" 
                                value={option}
                                checked={visibility === option}
                                onChange={() => setVisibility(option)}
                            />
                        </label>
                    ))}
                </label>
                <br />
                <label>
                    weather
                    {weatherOptions.map(option => (
                        <label key={option} style={{ marginLeft: '10px' }}>
                            {option}
                            <input 
                                type="radio" 
                                value={option}
                                checked={weather === option}
                                onChange={() => setWeather(option)}
                            />
                        </label>
                    ))}
                </label>
                <br />
                <label>
                    comment
                    <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AddNewEntry