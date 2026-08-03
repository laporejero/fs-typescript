import type { DiaryEntry } from "../types"

interface EntryProps {
    entry: DiaryEntry
}

const Entry = ({ entry }: EntryProps) => {
    console.log("Entry: ", entry)
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
        </div>
    )
}

export default Entry