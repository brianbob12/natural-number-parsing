const { parseNumber } = require('../lib/parseNumber');

describe('parseNumber weird and wonderful inputs', () => {
  it('should parse a number from a string', () => {
    expect(parseNumber('42')).toBe(42)
  })

  it('should return NaN if the string is not a number', () => {
    expect(parseNumber('foo')).toBeNaN()
  })

  it('should return NaN if the string is empty', () => {
    expect(parseNumber('')).toBeNaN()
  })

  it('should return NaN if the string is "minus"', () => {
    expect(parseNumber('minus')).toBeNaN()
  })

  it('should return NaN if the string is "negative"', () => {
    expect(parseNumber('negative')).toBeNaN()
  })

  it('should return NaN if the string is "-"', () => {
    expect(parseNumber('-')).toBeNaN()
  })

  it('should return NaN if the string is null', () => {
    expect(parseNumber(null)).toBeNaN()
  })

  it('should return NaN if the string is undefined', () => {
    expect(parseNumber(undefined)).toBeNaN()
  })

  it('should return NaN if the string is an object', () => {
    expect(parseNumber({})).toBeNaN()
  })

  it('should return NaN if the string is an array', () => {
    expect(parseNumber([])).toBeNaN()
  })

  it('should return NaN if the string is a function', () => {
    expect(parseNumber(() => { })).toBeNaN()
  })

  it('should return NaN if the string is a boolean', () => {
    expect(parseNumber(true)).toBeNaN()
  })
})

describe('parseNumber words that aren\'t numbers', () => {
  it('should return NaN if the string is a sentence', () => {
    expect(parseNumber('the quick brown fox')).toBeNaN()
  });

  it('should return NaN if the string contains more than just a number', () => {
    expect(parseNumber('I have 42 apples')).toBeNaN()
    expect(parseNumber('I have forty two apples')).toBeNaN()
  });

  it('should return NaN for \'and\', \'.\', and \'point\'', () => {
    expect(parseNumber('and')).toBeNaN()
    expect(parseNumber('.')).toBeNaN()
    expect(parseNumber('point')).toBeNaN()
  });

  it('should return NaN for malformed numbers', () => {
    expect(parseNumber('forty two point')).toBeNaN()
    expect(parseNumber('forty two point.')).toBeNaN()
    expect(parseNumber('forty two point and')).toBeNaN()
    expect(parseNumber('forty two point and.')).toBeNaN()

    expect(parseNumber('forty two point ten')).toBeNaN()
    expect(parseNumber('forty hundred')).toBeNaN()
    expect(parseNumber('forty thousand and')).toBeNaN()
  })

  it('should return NaN for any numbers with double negatives', () => {
    expect(parseNumber('minus minus forty two')).toBeNaN()
    expect(parseNumber('negative negative forty two')).toBeNaN()
    expect(parseNumber('minus negative forty two')).toBeNaN()
    expect(parseNumber('negative minus forty two')).toBeNaN()
    expect(parseNumber('- negative forty two')).toBeNaN()
    expect(parseNumber('- minus forty two')).toBeNaN()
    expect(parseNumber('minus - forty two')).toBeNaN()
    expect(parseNumber('negative - forty two')).toBeNaN()
    expect(parseNumber('- - forty two')).toBeNaN()
    expect(parseNumber('minus -42')).toBeNaN()
    expect(parseNumber('negative -42')).toBeNaN()
  })

  it('should be NaN for mixed-format numbers', () => {
    expect(parseNumber('forty two point 42')).toBeNaN()
    expect(parseNumber('forty two point four 2')).toBeNaN()
    expect(parseNumber('forty two point 4 2')).toBeNaN()
    expect(parseNumber('forty two point 4 two')).toBeNaN()

    expect(parseNumber('42 million 42 thousand 42')).toBeNaN()
    expect(parseNumber('42 million 42 thousand 42 point 42')).toBeNaN()
  })

  it('should be NaN for "hundred", "thousand", "million".. repeated', () => {
    expect(parseNumber('one hundred hundred')).toBeNaN()
    expect(parseNumber('one thousand thousand')).toBeNaN()
    expect(parseNumber('one million million')).toBeNaN()
    expect(parseNumber('one billion billion')).toBeNaN()
    expect(parseNumber('one trillion trillion')).toBeNaN()

    expect(parseNumber('three hundred thousand six thousand')).toBeNaN()
  })

  it('should be NaN for incorrectly hyphenated numbers', () => {
    expect(parseNumber('forty-two-point-four-two')).toBeNaN()
    expect(parseNumber('forty-two-thousand')).toBeNaN()
    expect(parseNumber('ten-two')).toBeNaN()
    expect(parseNumber('forty-zero')).toBeNaN()
  })
})


describe('parseNumber different number formats', () => {
  it('should be able to parse a standard decimal number', () => {
    expect(parseNumber('42')).toBe(42)
    expect(parseNumber('-42')).toBe(-42)
    expect(parseNumber('42.42')).toBe(42.42)
    expect(parseNumber('-42.42')).toBe(-42.42)
    expect(parseNumber('42.')).toBe(42)
    expect(parseNumber('.42')).toBe(0.42)
  })

  it('should be able to parse a number with commas', () => {
    expect(parseNumber('1,000')).toBe(1000)
    expect(parseNumber('1,000,000')).toBe(1000000)
    expect(parseNumber('1,000,000.42')).toBe(1000000.42)
  })

  it('should be able to a simple number from words', () => {
    expect(parseNumber('forty two')).toBe(42)
    expect(parseNumber('forty-two')).toBe(42)
    expect(parseNumber('forty two point four two')).toBe(42.42)
    expect(parseNumber('forty two point four two')).toBe(42.42)
    expect(parseNumber('forty two point four two')).toBe(42.42)
  })

  it('should be able to parse a large number from words', () => {
    expect(parseNumber('one hundred and twenty three thousand four hundred and fifty six')).toBe(123456)
    expect(parseNumber('one hundred and twenty three thousand four hundred and fifty six point seven eight nine')).toBe(123456.789)
    expect(parseNumber('one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine')).toBe(123456789)

    //with commas too

    expect(parseNumber('one hundred and twenty three thousand, four hundred and fifty six')).toBe(123456)
    expect(parseNumber('one hundred and twenty three thousand, four hundred and fifty six point seven eight nine')).toBe(123456.789)
    expect(parseNumber('one hundred and twenty three million, four hundred and fifty six thousand, seven hundred and eighty nine')).toBe(123456789)
  })

  it('should be able to parse teen hundreds', () => {
    expect(parseNumber('one hundred')).toBe(100)
    expect(parseNumber('two hundred')).toBe(200)
    expect(parseNumber('three hundred')).toBe(300)
    expect(parseNumber('four hundred')).toBe(400)
    expect(parseNumber('five hundred')).toBe(500)
    expect(parseNumber('six hundred')).toBe(600)
    expect(parseNumber('seven hundred')).toBe(700)
    expect(parseNumber('eight hundred')).toBe(800)
    expect(parseNumber('nine hundred')).toBe(900)

    expect(parseNumber('ten hundred')).toBeNaN()

    expect(parseNumber('eleven hundred')).toBe(1100)
    expect(parseNumber('twelve hundred')).toBe(1200)
    expect(parseNumber('thirteen hundred')).toBe(1300)
    expect(parseNumber('fourteen hundred')).toBe(1400)
    expect(parseNumber('fifteen hundred')).toBe(1500)
    expect(parseNumber('sixteen hundred')).toBe(1600)
    expect(parseNumber('seventeen hundred')).toBe(1700)
    expect(parseNumber('eighteen hundred')).toBe(1800)
    expect(parseNumber('nineteen hundred')).toBe(1900)

    expect(parseNumber('twenty one hundred')).toBeNaN()
    expect(parseNumber('twenty two hundred')).toBeNaN()
    expect(parseNumber('twenty three hundred')).toBeNaN()
  })

  it('should be able to parse a number with a negative sign', () => {
    expect(parseNumber('minus forty two')).toBe(-42)
    expect(parseNumber('negative forty two')).toBe(-42)
    expect(parseNumber('minus forty two point four two')).toBe(-42.42)
    expect(parseNumber('negative forty two point four two')).toBe(-42.42)
  })

  it('should be able to parse numbers with leading digits', () => {
    expect(parseNumber('42 million')).toBe(42000000)
    expect(parseNumber('42.42 million')).toBe(42420000)
  })

  it('should be able to parse natural language decimal million/billion/trillion', () => {
    expect(parseNumber('forty two point four million')).toBe(42.4 * 1_000_000)
    expect(parseNumber('forty two point four billion')).toBe(42.4 * 1_000_000_000)
    expect(parseNumber('forty two point four trillion')).toBe(42.4 * 1_000_000_000_000)
  })

  it('should be able to parse a number with a decimal point and no leading zero', () => {
    expect(parseNumber('.42')).toBe(0.42)
  })

  it('should be able to parse teens', () => {
    expect(parseNumber('eleven')).toBe(11)
    expect(parseNumber('twelve')).toBe(12)
    expect(parseNumber('thirteen')).toBe(13)
    expect(parseNumber('fourteen')).toBe(14)
    expect(parseNumber('fifteen')).toBe(15)
    expect(parseNumber('sixteen')).toBe(16)
    expect(parseNumber('seventeen')).toBe(17)
    expect(parseNumber('eighteen')).toBe(18)
    expect(parseNumber('nineteen')).toBe(19)
  })

  it('should be case insensitive', () => {
    expect(parseNumber('Forty Two')).toBe(42)
    expect(parseNumber('FORTY TWO')).toBe(42)
    expect(parseNumber('fOrTy TwO')).toBe(42)
  })

  it('should be able to parse hyphenated numbers', () => {
    expect(parseNumber('forty-two')).toBe(42)
    expect(parseNumber('forty-two point four two')).toBe(42.42)
    expect(parseNumber('forty-two thousand and fifty-nine')).toBe(42059)
  })
})