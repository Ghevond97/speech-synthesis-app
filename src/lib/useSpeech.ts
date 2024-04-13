import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

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

  const args = {
    onBoundary: (e: SpeechSynthesisEvent) => {
      console.log("E", e);
      e.preventDefault();
    },
    onEnd: (e: SpeechSynthesisEvent) => {
      e.preventDefault();
      console.log("e");
    },
    onStateUpdate: (state: PlayingState) => {
      setPlaybackState(state);
    },
  };
  const speechEngine = createSpeechEngine(args);
  if (sentences.length > 0) {
    console.log("HERE");
    speechEngine.load(sentences[0]);

    const synth = window.speechSynthesis;
    if (speechEngine.state.utterance) {
      console.log("STAT#");
      synth.speak(speechEngine.state.utterance);
    }
  }

  const play = () => {
    speechEngine.play();
  };
  const pause = () => {
    speechEngine.pause();
  };

  console.log("SPEECH ENGINE", speechEngine);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
