import { useState, useEffect } from "react";

import { PlayingState, createSpeechEngine, SpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine>();

  useEffect(() => {
    if (sentences.length > 0) {
      const args = {
        onBoundary: (e: SpeechSynthesisEvent) => {
          // Implement logic for handling boundary events (if needed)
        },
        onEnd: (e: SpeechSynthesisEvent) => {
          // Implement logic for handling end events (if needed)
          setCurrentSentenceIdx((prevIdx) => prevIdx + 1);
          setPlaybackState("paused");
        },
        onStateUpdate: (state: PlayingState) => {
          setPlaybackState(state);
        },
      };

      const newSpeechEngine = createSpeechEngine(args);

      setSpeechEngine(newSpeechEngine);
    }
  }, [sentences, currentSentenceIdx]);

  const load = () => {
    if (speechEngine) {
      speechEngine.load(sentences[currentSentenceIdx]);
      setPlaybackState("initialized");
    }
  };

  const play = () => {
    if (speechEngine) {
      speechEngine.play();
      setPlaybackState("playing");
    }
  };

  const pause = () => {
    if (speechEngine) {
      speechEngine.pause();
      setPlaybackState("paused");
    }
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    load,
    play,
    pause,
  };
};

export { useSpeech };
