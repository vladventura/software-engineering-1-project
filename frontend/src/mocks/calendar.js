// Simulating the two tables
let events = [];
let days = [];
let personalCalendar = {
    color: '#facfad',
    days: [],
    name: 'Personal Calendar',
};

for (let x = 1; x < 32; x++) {
    let day = {
        date: `11/${x}/2022`,
        month: '11',
        year: '2022',
        events: []
    };
    days.push(day);

    let event = {
        date: `11/${x}/2022`,
        number: x,
        startTime: '',
        endTime: '',
        description: `An event ${x}`,
        official: x % 2 == 0,
        calendar: '',
        name: `Event${x}`,
    };
    events.push(event);
}

days.map(day => {
    day.events = events.filter(e => e.date === day.date);
});

console.log(days);

personalCalendar.days = days;

export default personalCalendar;
