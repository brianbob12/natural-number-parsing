/**
 * 
 * @param input a sting of words to attempt to convert to a number
 * @returns [the number, or null if the input is not a number, if the input can be extended to a number]
 */
export const wordToNumber = (input:string):[number|null,boolean] => {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
  const scales = ["", "thousand", "million", "billion", "trillion"]

  let number = 0
  let currentNumber = 0
  let isDecimal = false
  let decimalMultiplier = 0.1

  let moreNumbersNeeded = false

  const INVALID_NUMBER:[number|null,boolean] = [null,false]

  const words = input.replace(/,/g,"").split(" ");
  for(let i = 0; i < words.length; i++){
    if(words[i] === ""){
      continue;
    }
    
    const word = words[i].trim().toLowerCase();
    if(word === "and"){
      moreNumbersNeeded = true
      continue
    }
    if(word === "point"){
      isDecimal = true
      moreNumbersNeeded = true
      continue
    }

    moreNumbersNeeded = false

    if(words[i].match(/^[0-9\\.]+$/)){
      if(currentNumber !== 0){
        return INVALID_NUMBER
      }
      const digit:number = +words[i]
      if(isNaN(digit)){
        return INVALID_NUMBER
      }
      currentNumber = digit
      continue
    }
    
    if(word === "hundred"){
      if(currentNumber === 0){
        currentNumber = 1
      }
      if(isDecimal || currentNumber%100 === 0){
        return INVALID_NUMBER
      }
      currentNumber *= 100
      continue
    }
    let scaleIndex = scales.indexOf(word);
    if(scaleIndex !== -1){
      if(currentNumber === 0){
        currentNumber = 1
      }
      if(isDecimal && scaleIndex > 1){
        //decimal + million/billion/trillion
        //if this is not the last word, then it is not a number
        if(i !== words.length-1){
          return INVALID_NUMBER
        }
        number = currentNumber * Math.pow(1000, scaleIndex)
        return [number, true]
      }
      if(isDecimal || currentNumber%1000 === 0){
        return INVALID_NUMBER
      }
      currentNumber *= Math.pow(1000, scaleIndex);
      number += currentNumber
      currentNumber = 0
      continue
    }

    let onesIndex = ones.indexOf(word);
    if(onesIndex !== -1){
      if((!isDecimal) && currentNumber%10 !== 0){
        return INVALID_NUMBER
      }
      if(isDecimal){
        currentNumber += onesIndex * decimalMultiplier;
        decimalMultiplier /= 10
      }
      else{
        currentNumber += onesIndex
      }
      continue
    }
    let teensIndex = teens.indexOf(word);
    if(teensIndex !== -1){
      if(isDecimal || currentNumber%100 !== 0){
        return INVALID_NUMBER
      }
      currentNumber += teensIndex + 10
      continue
    }
    let tensIndex = tens.indexOf(word);
    if(tensIndex !== -1){
      if(isDecimal || currentNumber%100 !== 0){
        return INVALID_NUMBER
      }
      currentNumber += tensIndex * 10
      continue
    }

    return INVALID_NUMBER
  }

  number += currentNumber
  
  //checking for some edge cases such as "point", "and"
  if(moreNumbersNeeded){
    return [null, true]
  }

  if(isDecimal){
    //clip to decimal multiplier to avoid floating point errors
    number = +number.toFixed(-Math.log10(decimalMultiplier))
  }

  return [number, true]
}