import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import diaryEntriesService from "./services/diaryEntriesService";
import DiaryEntries from "./components/DiaryEntries";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  
  useEffect(() => {
    diaryEntriesService.getAll().then(initialEntries => {
      setEntries(initialEntries)
    })
  }, [])

  return (
    <div>
      
      <DiaryEntries entries={entries} />
    </div>
  )
}

export default App