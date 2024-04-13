const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */

interface Response {
  content: string;
}
const fetchContent = async (url = API_URL): Promise<string> => {
  const response: Response = await fetch(url).then((response) =>
    response.json()
  );
  console.log("response", response);
  return response.content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  const speakTagRemoved = content
    .replace("<speak>", "")
    .replace("</speak>", "")
    .replace("<p>", "")
    .replace("</p", "");
  console.log("reamoved", speakTagRemoved);

  const arr = speakTagRemoved.split("<s>");
  console.log("SPLIT", arr);
  const sentencesArr = arr
    .map((elem) => {
      if (elem !== "") {
        const indexOfTag = elem.indexOf("</s>");
        const word = elem.slice(0, indexOfTag);
        console.log("sentence", word);
        return word;
      }
    })
    .filter((elem) => elem !== undefined);

  console.log("sentencesArr", sentencesArr);

  return sentencesArr || [];
};

export { fetchContent, parseContentIntoSentences };
