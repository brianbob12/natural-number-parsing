import { wordToNumber } from "./wordToNumber"

/**
 * 
 * @param input a string of words to attempt to convert to a number
 * @returns the number, or NaN if the input is not a number
 */
export const parseNumber = (input: string): number => {
  if(typeof input !== "string"){
    return NaN
  }
  if(input === ""){
    return NaN
  }
  const [number, continuable] = wordToNumber(input)
  if(number === null){
    return NaN
  }
  return number
}