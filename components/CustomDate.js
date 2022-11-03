
const CustomDate = (time) => {
  let date = new Date();

  let TimeType;
  let hour;

  hour = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hour <= 12) {
    TimeType = 'AM';
  } else {
    TimeType = 'PM';
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  if (hour == 0) {
    hour = 12;
  }

  function makeTwoDigits(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  }
  return makeTwoDigits(hour) + ':' + makeTwoDigits(minutes) + ` ${TimeType}`
}


export default CustomDate;