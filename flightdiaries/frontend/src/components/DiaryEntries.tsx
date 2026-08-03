import type { DiaryEntry } from "../types";
import Entry from "./Entry";

interface DiaryEntriesProps {
    entries: DiaryEntry[]
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
    return (
        <div>
            {entries.map(entry => (
                <Entry key={entry.id} entry={entry} />
            ))}
        </div>
    )
}

export default DiaryEntries