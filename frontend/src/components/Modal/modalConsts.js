export const notificationTimepair = [
  { time: 15, measure: "min" },
  { time: 30, measure: "min" },
  { time: 45, measure: "min" },
  { time: 1, measure: "hr" },
  { time: 3, measure: "hr" },
  { time: 5, measure: "hr" },
  { time: 1, measure: "day" },
];

export const findIndexOfTimepair = (tp) => {
  let a = 0;
  notificationTimepair.every((t, i) => {
    if (`${t.time}${t.measure}` === `${tp.time}${tp.measure}`) {
      a = i;
      return false;
    }
    return true;
  });
  return a;
};

export const notifMethodList = ["SMS", "Email", "Both"];
