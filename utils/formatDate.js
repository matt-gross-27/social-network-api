module.exports = (date) => {
  // Year string
  year = date.getFullYear().toString().substr(2,3);

  // Month string
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }
  const month = months[date.getMonth()];

  // Day string
  const day = String(date.getDate());
  const lastChar = day.substr(-1);
  let suffix;
  switch (true) {
    case lastChar === '1' && day !== '11': 
      suffix = 'st';
      break;
    case lastChar === '2' && day !== '12':
      suffix = 'nd';
      break;
    case lastChar == '3' && day !== '13':
      suffix = 'rd'
      break;
    default:
      suffix = 'th'
      break;
  }

  return `${month} ${day}${suffix} ${year}`;
}