/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentSentence = sentences[currentSentenceIdx];
  const currentWord =
    currentSentence &&
    currentSentence.substring(currentWordRange[0], currentWordRange[1]);
  return (
    <div data-testid="currently-reading">
      {currentSentence ? (
        <>
          <span data-testid="current-word">
            {currentWord || currentSentence.split(" ")[0]}
          </span>
          <p data-testid="current-sentence">{currentSentence}</p>
        </>
      ) : null}
      {sentences && <div>{sentences}</div>}
    </div>
  );
};
