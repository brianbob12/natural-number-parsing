const parseNumber = require('../lib/parseNumber');

describe('parseNumber weird and wonderful inputs', () => {
  it('should parse a number from a string', () => {
    expect(parseNumber('42')).toBe(42);
  });

  it('should return NaN if the string is not a number', () => {
    expect(parseNumber('foo')).toBeNaN();
  });

  it('should return NaN if the string is empty', () => {
    expect(parseNumber('')).toBeNaN();
  });

  it('should return NaN if the string is null', () => {
    expect(parseNumber(null)).toBeNaN();
  });

  it('should return NaN if the string is undefined', () => {
    expect(parseNumber(undefined)).toBeNaN();
  });

  it('should return NaN if the string is an object', () => {
    expect(parseNumber({})).toBeNaN();
  });

  it('should return NaN if the string is an array', () => {
    expect(parseNumber([])).toBeNaN();
  });

  it('should return NaN if the string is a function', () => {
    expect(parseNumber(() => { })).toBeNaN();
  });

  it('should return NaN if the string is a boolean', () => {
    expect(parseNumber(true)).toBeNaN();
  });
})

describe('parseNumber words that aren\'t numbers', () => {
  it('should return NaN if the string is a sentence', () => {
    expect(parseNumber('the quick brown fox')).toBeNaN();
  });

  it('should return NaN if the string contains more than just a number', () => {
    expect(parseNumber('I have 42 apples')).toBeNaN();
    expect(parseNumber('I have forty two apples')).toBeNaN();
  });

  it('should return NaN for \'and\', \'.\', and \'point\'', () => {
    expect(parseNumber('and')).toBeNaN();
    expect(parseNumber('.')).toBeNaN();
    expect(parseNumber('point')).toBeNaN();
  });

  it('should return NaN for malformed numbers', () => {
    expect(parseNumber('forty two point')).toBeNaN();
    expect(parseNumber('forty two point.')).toBeNaN();
    expect(parseNumber('forty two point and')).toBeNaN();
    expect(parseNumber('forty two point and.')).toBeNaN();

    expect(parseNumber('forty two point ten')).toBeNaN();
    expect(parseNumber('forty two point four million')).toBeNaN();
    expect(parseNumber('forty hundred')).toBeNaN();
    expect(parseNumber('forty thousand and')).toBeNaN();
  })
})


describe('parseNumber different number formats', () => {
  it('should be able to parse a standard decimal number', () => {
    expect(parseNumber('42')).toBe(42);
    expect(parseNumber('-42')).toBe(-42);
    expect(parseNumber('42.42')).toBe(42.42);
    expect(parseNumber('-42.42')).toBe(-42.42);
    expect(parseNumber('42.')).toBe(42);
    expect(parseNumber('.42')).toBe(0.42);
  })

  it('should be able to parse a number with commas', () => {
    expect(parseNumber('1,000')).toBe(1000);
    expect(parseNumber('1,000,000')).toBe(1000000);
    expect(parseNumber('1,000,000.42')).toBe(1000000.42);
  })

  it('should be able to a simple number from words', () => {
    expect(parseNumber('forty two')).toBe(42);
    expect(parseNumber('forty-two')).toBe(42);
    expect(parseNumber('forty two point four two')).toBe(42.42);
    expect(parseNumber('forty two point four two')).toBe(42.42);
    expect(parseNumber('forty two point four two')).toBe(42.42);
  })

  it('should be able to parse a large number from words', () => {
    expect(parseNumber('one hundred and twenty three thousand four hundred and fifty six')).toBe(123456);
    expect(parseNumber('one hundred and twenty three thousand four hundred and fifty six point seven eight nine')).toBe(123456.789);
    expect(parseNumber('one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine')).toBe(123456789);

    //with commas too

    expect(parseNumber('one hundred and twenty three thousand, four hundred and fifty six')).toBe(123456);
    expect(parseNumber('one hundred and twenty three thousand, four hundred and fifty six point seven eight nine')).toBe(123456.789);
    expect(parseNumber('one hundred and twenty three million, four hundred and fifty six thousand, seven hundred and eighty nine')).toBe(123456789);
  })

  it('should be able to parse a number with a negative sign', () => {
    expect(parseNumber('minus forty two')).toBe(-42);
    expect(parseNumber('negative forty two')).toBe(-42);
    expect(parseNumber('minus forty two point four two')).toBe(-42.42);
    expect(parseNumber('negative forty two point four two')).toBe(-42.42);
  })

  it('should be able to parse mixed-format numbers', () => {
    expect(parseNumber('forty two point 42')).toBe(42.42);
    expect(parseNumber('forty two point four 2')).toBe(42.42);
    expect(parseNumber('forty two point 4 2')).toBe(42.42);
    expect(parseNumber('forty two point 4 two')).toBe(42.42);

    expect(parseNumber('42 million')).toBe(42000000);
    expect(parseNumber('42 million 42 thousand 42')).toBe(42042042);
    expect(parseNumber('42 million 42 thousand 42 point 42')).toBe(42042042.42);
    expect(parseNumber('42.42 million')).toBe(42420000);
  })

  it('should be able to parse a number with a decimal point and no leading zero', () => {
    expect(parseNumber('.42')).toBe(0.42);
  })

  it('should be able to parse teens', () => {
    expect(parseNumber('eleven')).toBe(11);
    expect(parseNumber('twelve')).toBe(12);
    expect(parseNumber('thirteen')).toBe(13);
    expect(parseNumber('fourteen')).toBe(14);
    expect(parseNumber('fifteen')).toBe(15);
    expect(parseNumber('sixteen')).toBe(16);
    expect(parseNumber('seventeen')).toBe(17);
    expect(parseNumber('eighteen')).toBe(18);
    expect(parseNumber('nineteen')).toBe(19);
  })

  it('should be case insensitive', () => {
    expect(parseNumber('Forty Two')).toBe(42);
    expect(parseNumber('FORTY TWO')).toBe(42);
    expect(parseNumber('fOrTy TwO')).toBe(42);
  })
})