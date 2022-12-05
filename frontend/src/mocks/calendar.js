// Simulating the two tables
const now = new Date();
let events = [];
let days = [];
let personalCalendar = {
  color: "#f9dc00",
  name: "Physics I",
  events: [],
  visible: true,
  course: true,
};

let gui1 = {
  color: "#b2fadc",
  name: "GUI I",
  events: [],
  visible: true,
  course: true,
};

let gui1Events = [];

for (let x = 1; x < 32; x++) {
  let event = {
    date: `${now.getMonth() + 1}/${x}/${now.getFullYear()}`,
    number: x,
    month: now.getMonth() + 1,
    dueTime: "8:00",
    description: `An event ${x}`,
    official: personalCalendar.course,
    submitted: x % 3 === 0,
    calendar: personalCalendar.name,
    name: `Quiz ${events.length + 1}`,
    color: personalCalendar.color,
  };
  if (x % 2 === 0) events.push(event);
}

for (let x = 1; x < 32; x++) {
  let event = {
    date: `${now.getMonth() + 1}/${x}/${now.getFullYear()}`,
    number: x,
    month: now.getMonth() + 1,
    dueTime: "11:59",
    description: `An event ${x}`,
    official: gui1.course,
    submitted: x % 3 === 0,
    calendar: gui1.name,
    name: `Lab ${gui1Events.length + 1}`,
    color: gui1.color,
  };
  if (x % 5 === 0) gui1Events.push(event);
}

personalCalendar.events = events;
gui1.events = gui1Events;

console.log(gui1);

export default personalCalendar;
export const guiCalendar = gui1;
export const singleEvent = events[0];
export const singleDay = days[0];
