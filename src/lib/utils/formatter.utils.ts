/**
   * Format a date string
  /**
   * Format a date string
   * @param dateString - The date string to format
   * @param options - Intl.DateTimeFormatOptions
   * @returns Formatted date string
   */
export type DateFormatOptions =
  | 'MMM D, YYYY'
  | 'D MMM YYYY'
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD';
export const formatDate = (
  dateString: string | Date,
  format?: DateFormatOptions,
): string => {
  const date = new Date(dateString);

  switch (format) {
    case 'MMM D, YYYY':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'D MMM YYYY':
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'MM/DD/YYYY':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    case 'DD/MM/YYYY':
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    case 'YYYY-MM-DD':
      return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    default:
      // Use provided options or default to "April 02, 2025" format
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
  }
};

/**
 * Format a date string
 * @param timeString - The time string to format
 * @returns Formatted time string
 */
export const formatTime = (time: string, format: '12h' | '24h' = '12h') => {
  if (format === '24h') {
    return time;
  }

  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(':');

  // Convert hours to a number
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  if (hour === 0) {
    hour = 12; // Midnight case
  } else if (hour > 12) {
    hour = hour - 12;
  }

  // Return formatted time
  return `${hour.toString().padStart(2, '0')}:${minutes.padStart(
    2,
    '0',
  )} ${period}`;
};

/**
 * Format a date and time string
 * @param dateString - The date string to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  dateString: Date | string,
  format?: DateFormatOptions,
): string => {
  const date = new Date(dateString);

  // Format the date part
  const formattedDate = formatDate(dateString, format);

  // Format the time part
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  const formattedTime = formatTime(timeString);

  // Combine date and time
  return `${formattedDate}, ${formattedTime}`;
};

/**
 * Format a date string with days (in future)
 * @param dateString - The date string to format
 * @param days - The number of days to add to the date
 * @param time - Whether to include the time in the formatted date
 * @returns Formatted date string
 */
export const formatDateWithDays = (
  dateString: string,
  days: number,
  time?: boolean,
): string => {
  const date = new Date(dateString);
  days = days - 1;
  if (days < 0) {
    date.setDate(date.getDate());
  } else {
    date.setDate(date.getDate() + days);
  }

  // Include time if provided
  if (time) {
    return formatDateTime(date.toISOString());
  }

  return formatDate(date.toISOString());
};

/**
 * Format a duration in seconds to a human readable string
 * @param seconds - The duration in seconds
 * @param exact - If true, returns full time breakdown with short abbreviations (d, h, m, s). If false, returns only the largest unit with full words.
 * @returns Formatted duration string
 */
export const formatDuration = (
  seconds: number,
  exact: boolean = false,
): string => {
  // If exact is true, return full time breakdown with short abbreviations
  if (exact) {
    const totalSeconds = Math.floor(seconds);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts: string[] = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0) parts.push(`${secs}s`);

    return parts.length > 0 ? parts.join(' ') : '0s';
  }

  // Original behavior: return only the largest unit with full words
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Days
  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }

  // Hours
  if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  // Minutes
  if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  // Seconds
  return `${seconds} second${seconds !== 1 ? 's' : ''}`;
};

/**
 * Truncate a string to a specified length
 * @param str - The string to truncate
 * @param length - The maximum length
 * @returns Truncated string
 */
export const truncateString = (str: string, length = 50): string => {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a phone number
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export const formatIndianPhoneNumber = (phone: string): string => {
  if (!phone) return 'N/A';

  const cleaned = phone.replace(/\D/g, '');

  // Check for 10-digit number or 91-prefixed 12-digit number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};

/**
 * Format a string (Remove extra character by spliting them)
 * @param string String
 * @param splitBy Seperator
 * @returns Will return a clean string
 */
export const formatString = (
  string: string,
  splitBy: string,
  joinBy: string = ' ',
) => {
  return string
    .split(splitBy)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(joinBy);
};

/**
 * Round a number to a specified precision
 * @param number - The number to round
 * @param precision - The precision to round to (default: 2)
 * @returns The rounded number
 */
export const roundNumber = (number: number, precision: number = 2): number => {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
};

/**
 * Convert words to numbers
 * @param words - The words to convert
 * @returns The converted number
 */
export const convertWordsToNumbers = (words: string): number | null => {
  const ones: { [key: string]: number } = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  };

  const tens: { [key: string]: number } = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  const scales: { [key: string]: number } = {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
  };

  const cleanInput = words.toLowerCase().trim();
  const tokens = cleanInput.split(/\s+/);

  let result = 0;
  let current = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (ones[token] !== undefined) {
      current += ones[token];
    } else if (tens[token] !== undefined) {
      current += tens[token];
    } else if (token === 'hundred') {
      if (current === 0) current = 1; // Handle "hundred" without preceding number
      current *= 100;
    } else if (scales[token] !== undefined) {
      if (current === 0) current = 1; // Handle "thousand" without preceding number
      result += current * scales[token];
      current = 0;
    } else {
      return null; // Invalid token
    }
  }

  return result + current;
};

/**
 * Convert a number to words
 * @param num - The number to convert
 * @returns The converted words
 */
export const convertNumberToWords = (num: number): string | null => {
  if (num < 0 || !Number.isInteger(num)) {
    return null; // Handle negative numbers or non-integers
  }

  const ones: string[] = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const tens: string[] = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  const scales: string[] = ['', 'thousand', 'million', 'billion'];

  // Special case for zero
  if (num === 0) return 'zero';

  function convertHundreds(n: number): string {
    let result = '';

    // Handle hundreds place
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' hundred';
      n %= 100;
      if (n > 0) result += ' ';
    }

    // Handle tens and ones place
    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) result += ' ' + ones[n];
    } else if (n > 0) {
      result += ones[n];
    }

    return result;
  }

  function convert(n: number): string {
    if (n === 0) return '';

    let result = '';
    let scaleIndex = 0;

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk !== 0) {
        const chunkWords = convertHundreds(chunk);
        if (scaleIndex > 0) {
          result =
            chunkWords +
            ' ' +
            scales[scaleIndex] +
            (result ? ' ' + result : '');
        } else {
          result = chunkWords;
        }
      }
      n = Math.floor(n / 1000);
      scaleIndex++;
    }

    return result;
  }

  return convert(num);
};

/**
 * Get the ordinal of a number
 * @param num - The number to get the ordinal of
 * @returns The ordinal of the number
 */
export const getOrdinal = (num: number): string => {
  const j = num % 10,
    k = num % 100;

  if (k >= 11 && k <= 13) {
    return `${num}th`;
  }

  switch (j) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
};

/**
 * Format a class
 * @param class - The class to format
 * @returns The formatted class
 */
export const formatClass = (
  classValue?: string,
  withValue: boolean = false,
): string => {
  const value = classValue
    ? getOrdinal(convertWordsToNumbers(classValue) || 0)
    : 'N/A';

  return withValue ? `${value} (${classValue})` : value;
};

/**
 * Format an account number
 * @param accountNumber - The account number to format
 * @returns The formatted account number
 */
export const formatAccountNumber = (accountNumber?: string) => {
  if (!accountNumber) return 'N/A';

  const compact = accountNumber?.replace(/\s+/g, '') || '';
  if (!/^\d+$/.test(compact)) return accountNumber;
  return compact.replace(/(\d{4})(?=\d)/g, '$1 ');
};
