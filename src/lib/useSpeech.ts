import { useState, useEffect, useRef } from "react";

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
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine | null>(null);
  const currentWordRangeRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    if (sentences.length > 0) {
      const args = {
        onBoundary: (e: SpeechSynthesisEvent) => {
          // Extract the current word range from the event

          e.preventDefault();
          const wordRange: [number, number] = [
            e.charIndex,
            e.charIndex + e.charLength,
          ];
          setCurrentWordRange(wordRange);

          // Get the current word from the sentence using the word range
          const currentWord = sentences[currentSentenceIdx].substring(
            wordRange[0],
            wordRange[1]
          );
          currentWordRangeRef.current = wordRange;
        },
        onEnd: (e: SpeechSynthesisEvent) => {
          if (currentSentenceIdx === sentences.length - 1) {
            setCurrentSentenceIdx(0);
          } else {
            setCurrentSentenceIdx(currentSentenceIdx + 1);
          }
          setPlaybackState("paused");
          currentWordRangeRef.current = [0, 0];
        },
        onStateUpdate: (state: PlayingState) => {
          setPlaybackState(state);
        },
      };

      const newSpeechEngine = createSpeechEngine(args);
      setSpeechEngine(newSpeechEngine);

      return () => {
        newSpeechEngine.cancel();
      };
    }
  }, [sentences, currentSentenceIdx]);

  const load = () => {
    if (speechEngine && sentences.length > 0) {
      speechEngine.cancel();
      setCurrentSentenceIdx(0);
      speechEngine.load(sentences[0]);
    }
  };

  const play = () => {
    if (speechEngine && sentences.length > 0) {
      speechEngine.load(sentences[currentSentenceIdx]);
      speechEngine.play();
    }
  };

  const pause = () => {
    if (speechEngine) {
      speechEngine.pause();
    }
  };

  return {
    currentSentenceIdx,
    playbackState,
    currentWordRange: [
      Number(currentWordRangeRef.current[0]),
      Number(currentWordRangeRef.current[1]),
    ] as [number, number],
    load,
    play,
    pause,
  };
};

export { useSpeech };
