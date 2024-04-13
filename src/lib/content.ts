const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */

interface Response {
  content: string;
}
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response: Response = await fetch(url).then((response) =>
      response.json()
    );
    console.log("response", response);
    return response.content;
  } catch {
    return "<speak><s>There was an error</s></speak>";
  }
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
  const sentencesArr: string[] = arr
    .map((elem): string | undefined => {
      if (elem !== "") {
        const indexOfTag = elem.indexOf("</s>");
        const word = elem.slice(0, indexOfTag);
        return word;
      }
      return undefined;
    })
    .filter((elem): elem is string => typeof elem === "string");
  return sentencesArr;
};

export { fetchContent, parseContentIntoSentences };
