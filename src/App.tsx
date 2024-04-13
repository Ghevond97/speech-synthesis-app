import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  // const { currentWord, currentSentence, controls } = useSpeech(sentences);
  const fetchData = useCallback(async () => {
    const data = await fetchContent();
    console.log("DATA", data);
    if (data) {
      setSentences(parseContentIntoSentences(data));
    }
  }, [fetchContent, parseContentIntoSentences]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const speech = useSpeech(sentences);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading />
      </div>
      <div>
        <Controls />
      </div>
    </div>
  );
}

export default App;
