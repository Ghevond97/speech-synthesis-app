import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";
import { PlayingState } from "./lib/speech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchContent();
      if (data) {
        const parsedSentences = parseContentIntoSentences(data);
        setSentences(parsedSentences);
        return parsedSentences;
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }, []);

  const loadNewContent = async () => {
    await fetchData(); // Fetch new sentences
    // speech.loadNewContent;sq
    speech.load();
  };

  useEffect(() => {
    if (sentences.length === 0) {
      loadNewContent();
    }
  }, [sentences]);
  const speech = useSpeech(sentences);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        {sentences && (
          <CurrentlyReading
            sentences={sentences}
            currentSentenceIdx={speech.currentSentenceIdx}
            currentWordRange={speech.currentWordRange}
          />
        )}
      </div>
      <div>
        {speech && (
          <Controls
            play={speech.play}
            pause={speech.pause}
            loadNewContent={loadNewContent}
            state={speech.playbackState}
          />
        )}
      </div>
    </div>
  );
}

export default App;
