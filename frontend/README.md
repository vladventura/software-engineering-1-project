# SE1 Project - BB Calendar

Use
`npm start`
to run the app. Please make sure you have [Node.JS](https://nodejs.org/en/) installed. This project was started with Node v18, and npm v8.

For linter, we're using the Prettier extension on VS Code.

Bootstrapped with [vladventura's cra](https://github.com/vladventura/cra).

## How?

First, the CalendarDisplay is exactly what it is and nothing else: a way to display the calendar. It is not the calendar grid, or its menu, or its items, but just the container for all of these.

The first step is to make the CalendarItem look like the BB one by having a number, and a list of clickables called "events".

Then the next step is to show a CalendarGrid component, which would generate multiple CalendarItem-s. This grid should also self adjust to the screen. For now, we can just have a mock list of calendar items for a particular month (ideally the backend would send this list back).

For the prototype, the events should be clickable. We'll make a mock EventDetails component (page or modal?) for this purpose.

## Notes

Should consider using PropTypes to make it easier for React beginners to follow what's happening
