module.exports = (timestamp) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const dateObj = new Date(timestamp);
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
  
    return `${months[month]} ${day}, ${year}`;
  };
  