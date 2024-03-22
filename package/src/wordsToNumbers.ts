import { wordToNumber } from "./wordToNumber";


/**
 * 
 * @param input
 * @returns the input string with all detected numbers converted to decimal format
 */
export const wordsToNumbers = (input:string):string => {
  const words = input.split(" ")

  let currentWords:string[] = []
  let out:string[] = []

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word === "") {
      continue
    }
    if(
      currentWords.length === 0 ||
      !wordToNumber([...currentWords, word].join(" "))[1]){
      //add the current words to the output

      //pop off words until number is valid
      const popped = []
      while(
        currentWords.length > 0 &&
        wordToNumber(currentWords.join(" "))[0] === null
      ){
        popped.push(currentWords.pop()!) 
      }
      if(currentWords.length > 0){
        out.push(wordToNumber(currentWords.join(" "))[0]!.toString());
      }
      out.push(...popped.reverse())
      currentWords = [];
      if(wordToNumber(word)[1]){
        //add the word to the current words
        currentWords.push(word)
      }
      else{
        //add the word to the output
        out.push(word)
      }
    }
    else{
      //add the current words to the current words
      currentWords.push(word)
    }
  }
  if(currentWords.length > 0){
    const [number, continuable] = wordToNumber(currentWords.join(" "));
    if(number !== null){
      out.push(wordToNumber(currentWords.join(" "))[0]!.toString());
    }
    else{
      out.push(...currentWords)
    }
  }

  return out.join(" ");

}