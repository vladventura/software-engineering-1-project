// Simulating the two tables
let events = [];
let days = [];
let personalCalendar = {
  color: "#facfad",
  name: "Personal Calendar",
  events: [],
  visible: true,
};

for (let x = 1; x < 32; x++) {
  let event = {
    date: `12/${x}/2022`,
    number: x,
    month: 12,
    dueTime: "1:00pm",
    description: `An event ${x}`,
    official: x % 2 === 0,
    calendar: personalCalendar.name,
    name: `Event${x}`,
    color: personalCalendar.color,
  };
  events.push(event);
}

personalCalendar.events = events;

export default personalCalendar;
export const singleEvent = events[0];
export const singleDay = days[0];
