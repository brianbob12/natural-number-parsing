/**
 * 
 * @param num a number to convert to words
 * @returns a string representing the number in words (e.g. "one hundred and twenty three")
 */
const numberToWords = (num: number): string => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];
  const scales = ["", "thousand", "million", "billion", "trillion"];

  if (num === 0) {
    return "zero";
  }

  const sign = num < 0 ? "-" : "";
  let remaining = Math.abs(num);
  let words = "";

  for (let i = 0; remaining >= 1; i++) {
    const chunk = remaining % 1000;
    remaining = Math.floor(remaining / 1000);

    if (chunk !== 0) {
      let chunkWords = "";

      if (chunk < 20) {
        chunkWords = ones[chunk];
      } else if (chunk < 100) {
        chunkWords = tens[Math.floor(chunk / 10)] + (chunk % 10 !== 0 ? " " + ones[chunk % 10] : "");
      } else {
        chunkWords = ones[Math.floor(chunk / 100)] + " hundred" + (chunk % 100 !== 0 ? " and " + numberToWords(chunk % 100) : "");
      }

      words = chunkWords + " " + scales[i] + " " + words;
    }
  }

  // Handle decimal part
  if (num % 1 !== 0) {
    const decimalPart = num.toString().split(".")[1];
    words += " point";
    for (let i = 0; i < decimalPart.length; i++) {
      words += " " + ones[parseInt(decimalPart[i])];
    }
  }

  return sign + words.trim();
}


export default numberToWords