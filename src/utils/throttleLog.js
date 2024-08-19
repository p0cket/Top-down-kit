// throttleLog.js

let lastLogTime = 0;

/**
 * Throttles a log function so that it only logs once within the specified interval.
 * @param {Function} logFn - The log function to be throttled.
 * @param {number} interval - The interval in milliseconds within which the log can only occur once.
 */
export function throttleLog(logFn, interval = 7000) {
  const now = Date.now();

  if (now - lastLogTime >= interval) {
    logFn();
    lastLogTime = now;
  }
}
