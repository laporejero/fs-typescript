import { useEffect, useState } from "react";
import type { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import diaryEntriesService from "./services/diaryEntriesService";
import DiaryEntries from "./components/DiaryEntries";
import AddNewEntry from "./components/AddNewEntry";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  
  useEffect(() => {
    diaryEntriesService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  const diaryEntryCreation = (
    date: string,
    visibility: Visibility,
    weather: Weather,
    comment: string
  ) => {
    try {
      const newDiaryEntry: NewDiaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      }

      diaryEntriesService.create(newDiaryEntry)
        .then(newEntry => {
          setEntries(entries.concat(newEntry))
        })
    } catch (error) {
      console.error('Failed to create entry', error)
    }
  }

  return (
    <div>
      <AddNewEntry diaryEntryCreation={diaryEntryCreation} />
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App