// Utilities.js
export function formatCallLength(decimalTime) {
    const minutes = Math.floor(decimalTime);
    const seconds = Math.round((decimalTime - minutes) * 60);
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }
  
  export function formatCreatedAt(isoString) {
    const date = new Date(isoString);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} at ${formattedTime}`;
  }
  