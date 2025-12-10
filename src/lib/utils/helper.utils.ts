/*
 * Error Message
 * @param error - Error object
 * @returns Error message as string
 */
export const errorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  // Default Message
  let msg: string = 'Exception, Some error occured!';

  if (typeof error === 'object' && error !== null) {
    // Mongoose Error
    if (error?.errorResponse?.code === 11000) {
      return `409:${
        error.errorResponse.keyValue[
          Object.keys(error.errorResponse.keyValue)[0]
        ]
      } is already in use.`;
    }

    // Message
    msg =
      error.message || error.data.message || error.data.error || error.error;

    // Check if error is of cast object id
    if (msg.includes('Cast to ObjectId')) {
      const regex = /value\s+"([^"]+)"[^]+path\s+"([^"]+)"/;
      const match = msg.match(regex);

      if (match) {
        const [, value, path] = match;
        return `400:The provided value [${value}] is not a valid ObjectId for the field [${path}].`;
      }
    }
  }
  return msg;
};

/**
 * Returns an array of non-null values from the input array.
 * @param values - The array to filter.
 * @returns An array of non-null values.
 */
export const getNotNull = <R>(values: any[]): R[] => {
  return values.filter((value) => value !== null && value !== undefined) as R[];
};

/**
 * Set Index for each item in the array
 * @param data - The array of items to set the index for
 * @param filters - The filters to use to set the index
 * @returns The array of items with the index set
 */
export const setIndex = <T>(
  data: T[],
  filters: { page: number; limit: number },
) => {
  // Set Index for each item in the array
  return data.map((item: T, index: number) => {
    (item as any).index = (filters.page - 1) * filters.limit + index + 1;
    return item;
  });
};

/**
 * Utility to parse date string safely
 * @param dateStr - Date string
 * @param endOfDay - Whether to set the time to the end of the day
 * @returns Date object
 */
export const parseDate = (dateStr: string, endOfDay = false): Date => {
  const date = new Date(dateStr);
  if (endOfDay) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

/**
 * Get Date Range
 * @param from - From Date
 * @param to - To Date
 * @returns Date Range
 */
export const getDateRange = (from: string, to: string) => {
  const startDate = parseDate(from);
  const endDate = parseDate(to, true);

  return { from: startDate, to: endDate };
};

export const getEndDate = (startDate: Date, durationInDays: number): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationInDays);
  return endDate;
};

/**
 * Check if a value is a valid enum value
 * @param enumObj - The enum object
 * @param value - The value to check
 * @returns True if the value is a valid enum value, false otherwise
 */
export const isEnumValue = <T extends Record<string, string | number>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] => Object.values(enumObj).includes(value as T[keyof T]);

/**
 * Check Link Version
 * @param link - The link to check
 * @returns The version of the link
 */
export const checkLinkVersion = (link: string) => {
  const segments = link.split('/');
  const alias = segments[segments.length - 1].split('?')[0].split('_')[0];

  // If the alias starts with 'v', increment the number
  if (alias.startsWith('v')) {
    return `v${(Number(alias.replace('v', '')) || 0) + 1}`;
  }

  // If the alias does not start with 'v', return 'v1'
  return 'v1';
};
