import { useEffect, useState } from "react";
import type { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import diaryEntriesService from "./services/diaryEntriesService";
import DiaryEntries from "./components/DiaryEntries";
import AddNewEntry from "./components/AddNewEntry";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    diaryEntriesService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  const diaryEntryCreation = async (
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

      const newEntry = await diaryEntriesService.create(newDiaryEntry)

      setEntries(entries.concat(newEntry))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.error
        const message = "Error: " + errors[0].message

        if (errors) {
          setErrorMessage(message)

          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        }
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && ( 
        <div style={{ color: 'red' }}>{errorMessage}</div> 
      )}
      <AddNewEntry diaryEntryCreation={diaryEntryCreation} />
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App