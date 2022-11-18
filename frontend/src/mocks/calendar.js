// Simulating the two tables
let events = [];
let days = [];
let personalCalendar = {
  color: "#facfad",
  days: [],
  name: "Personal Calendar",
};

for (let x = 1; x < 32; x++) {
  let day = {
    date: `11/${x}/2022`,
    month: "11",
    year: "2022",
    number: x,
    events: [],
  };
  days.push(day);

  let event = {
    date: `11/${x}/2022`,
    number: x,
    dueTime: "1:00pm",
    description: `An event ${x}`,
    official: x % 2 == 0,
    calendar: "",
    name: `Event${x}`,
    color: personalCalendar.color,
  };
  events.push(event);
}

days.forEach((day) => {
  day.events = events.filter((e) => e.date === day.date);
});

personalCalendar.days = days;

export default personalCalendar;
export const singleEvent = days[0].events[0];
export const singleDay = days[0];
