const MakeTwoDigits = (number) => (number <= 9 ? `0${number}` : `${number}`);

export const displayTime = (milseconds) => {
  let seconds = 0;
  let minutes = 0;

  if (milseconds < 0) {
    milseconds = 0;
  }

  if (milseconds < 100) {
    return `00:00:${MakeTwoDigits(milseconds)}`;
  }

  let remainMilSeconds = milseconds % 100;
  seconds = (milseconds - remainMilSeconds) / 100;

  if (seconds < 60) {
    return `00:${MakeTwoDigits(seconds)}:${MakeTwoDigits(remainMilSeconds)}`;
  }

  let remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;

  return `${MakeTwoDigits(minutes)}:${MakeTwoDigits(
    remainSeconds
  )}:${MakeTwoDigits(remainMilSeconds)}`;
};
