import type { DiaryEntry } from "../types";
import Entry from "./DiaryEntry";

interface DiaryEntriesProps {
    entries: DiaryEntry[]
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {entries.map(entry => (
                <Entry key={entry.id} entry={entry} />
            ))}
        </div>
    )
}

export default DiaryEntries