const ONES = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
]
const TEENS = [
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen",
]
const TENS = [
	"",
	"",
	"twenty",
	"thirty",
	"forty",
	"fifty",
	"sixty",
	"seventy",
	"eighty",
	"ninety",
]
const SCALES = ["", "thousand", "million", "billion", "trillion"]

const isHyphenatedNumber = (word: string): null | [string, string] => {
	const splits = word.split("-")
	if (splits.length !== 2) {
		return null
	}
	if (ONES.indexOf(splits[1]) <= 1) {
		//word-zero is not a split
		return null
	}
	if (TENS.indexOf(splits[0]) <= 1) {
		//word-zero is not a split
		return null
	}
	return [splits[0], splits[1]]
}

const breakUpHyphenatedNumbers = (words: string[]): string[] => {
	const newWords: string[] = []
	for (let i = 0; i < words.length; i++) {
		const split = isHyphenatedNumber(words[i])
		if (split !== null) {
			newWords.push(split[0])
			newWords.push(split[1])
		} else {
			newWords.push(words[i])
		}
	}
	return newWords
}

const replaceKWithThousand = (words: string[]): string[] => {
	const newWords: string[] = []
	for (let i = 0; i < words.length; i++) {
		if (words[i] === "k") {
			newWords.push("thousand")
			continue
		}
		if (words[i].endsWith("k")) {
			newWords.push(words[i].substring(0, words[i].length - 1))
			newWords.push("thousand")
			continue
		}
		newWords.push(words[i])
	}
	return newWords
}

/**
 *
 * @param input a sting of words to attempt to convert to a number
 * @returns [the number, or null if the input is not a number, if the input can be extended to a number]
 */
export const wordToNumber = (input: string): [number | null, boolean] => {
	let number = 0
	let currentNumber = 0
	let isDecimal = false
	let decimalMultiplier = 0.1
	let isNegative = false

	let moreNumbersNeeded = false

	const INVALID_NUMBER: [number | null, boolean] = [null, false]

	//  #1  words pre-processing
	let words = input.replace(/,/g, "").split(" ")

	//handle leading minus
	if (words.length > 0 && (words[0] === "minus" || words[0] === "negative")) {
		words.shift()
		moreNumbersNeeded = true
		isNegative = true
	} else if (words.length > 0 && words[0].startsWith("-")) {
		isNegative = true
		words[0] = words[0].substring(1)
		moreNumbersNeeded = true
	}

	words = breakUpHyphenatedNumbers(words)
	words = replaceKWithThousand(words)

	//  #2  number building

	for (let i = 0; i < words.length; i++) {
		if (words[i] === "") {
			continue
		}

		const word = words[i].trim().toLowerCase()
		if (word === "and") {
			moreNumbersNeeded = true
			continue
		}
		if (word === "point") {
			isDecimal = true
			moreNumbersNeeded = true
			continue
		}

		moreNumbersNeeded = false

		if (words[i].match(/^[0-9\\.]+$/)) {
			if (i != 0) {
				return INVALID_NUMBER
			}
			if (currentNumber !== 0) {
				return INVALID_NUMBER
			}
			const digit: number = +words[i]
			if (isNaN(digit)) {
				return INVALID_NUMBER
			}

			currentNumber = digit
			continue
		}

		if (word === "hundred") {
			if (currentNumber === 0) {
				currentNumber = 1
			}
			if (
				isDecimal ||
				currentNumber % 100 === 0 ||
				currentNumber % 100 === 10 ||
				currentNumber % 100 > 19
			) {
				return INVALID_NUMBER
			}
			currentNumber *= 100
			continue
		}
		let scaleIndex = SCALES.indexOf(word)
		if (scaleIndex !== -1) {
			if (currentNumber === 0) {
				currentNumber = 1
			}
			if (isDecimal && scaleIndex > 1) {
				//decimal + million/billion/trillion
				//if this is not the last word, then it is not a number
				if (i !== words.length - 1) {
					return INVALID_NUMBER
				}
				number = currentNumber * Math.pow(1000, scaleIndex)
				if (isNegative) {
					number = -number
				}
				return [number, true]
			}
			const multiplier = Math.pow(1000, scaleIndex)
			if (
				isDecimal ||
				currentNumber % 1000 === 0 ||
				currentNumber >= multiplier ||
				(number / multiplier) % 1000 !== 0 //could conflict
			) {
				return INVALID_NUMBER
			}
			currentNumber *= multiplier
			number += currentNumber
			currentNumber = 0
			continue
		}

		let onesIndex = ONES.indexOf(word)
		if (onesIndex !== -1) {
			if (!isDecimal && currentNumber % 10 !== 0) {
				return INVALID_NUMBER
			}
			if (isDecimal) {
				currentNumber += onesIndex * decimalMultiplier
				decimalMultiplier /= 10
			} else {
				currentNumber += onesIndex
			}
			continue
		}
		let teensIndex = TEENS.indexOf(word)
		if (teensIndex !== -1) {
			if (isDecimal || currentNumber % 100 !== 0) {
				return INVALID_NUMBER
			}
			currentNumber += teensIndex + 10
			continue
		}
		let tensIndex = TENS.indexOf(word)
		if (tensIndex !== -1) {
			if (isDecimal || currentNumber % 100 !== 0) {
				return INVALID_NUMBER
			}
			currentNumber += tensIndex * 10
			continue
		}

		return INVALID_NUMBER
	}

	number += currentNumber

	//checking for some edge cases such as "point", "and"
	if (moreNumbersNeeded) {
		return [null, true]
	}

	if (isDecimal) {
		//clip to decimal multiplier to avoid floating point errors
		number = +number.toFixed(-Math.log10(decimalMultiplier))
	}
	if (isNegative) {
		number = -number
	}
	return [number, true]
}
