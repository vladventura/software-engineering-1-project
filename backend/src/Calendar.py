# Calendar classes
#
# A calendar stores events and has the ability to edit them.
#
# The calendar manager controls each calendar and determines
# which properties of calendars will be modified, depending
# on if they are official or not.
#

from datetime import datetime, time, timedelta
from Event import Event, ClassEvent
from Database import Database

class Calendar:
    def __init__(self, title: str, color: str, official: bool):
        self.title = title
        self.color = color
        self.official = official
        self.events = {}


    def createEvent(self,   title: str, 
                            description: str, 
                            date: datetime, 
                            duration: time, 
                            repeats: bool,
                            frequency):

        self.events[title] = Event(
            title, description, date, duration, repeats, frequency)


    def editEvent(self, event: str, 
                        title: str = None, 
                        description: str = None, 
                        date: datetime = None, 
                        duration: datetime = None, 
                        repeats: bool = None,
                        frequency: int = None):

        if title != None:
            self.events[event].title = title
        if description != None:
            self.events[event].title = description
        if date != None:
            self.events[event].title = date
        if duration != None:
            self.events[event].title = duration
        if repeats != None:
            self.events[event].title = repeats
        if frequency != None:
            self.events[event].title = frequency


    def deleteEvent(self, event: str):
        self.events.pop(event)




class CalendarManager:
    def __init__(self, database: Database):
        self.calendar_db = database.getCalendarData()  # data base ref to calendar section
        # initializing calendars
        self.calendars_tb = {}
        for key in self.calendar_db:
            # create calendar object - and its associated events.
            # get required parts to create base calendar object
            title    = self.calendar_db[key]["title"]
            color    = self.calendar_db[key]["color"]
            official = self.calendar_db[key]["is_official"]
            # create calendar - we want to attach new events into this.
            calendar = Calendar(title, color, official)
            if official:
                calendar.events = self._makeEvents(self.calendar_db[key]["events"])
            else:
                calendar.events = self._makeClassEvent(self.calendar_db[key]["events"])
            # add to the calendars dictionary
            self.calendars_tb[title] = calendar

    # d is a dictionary containing events
    def _makeEvents(self, d):
        events = {}
        for key in d:
            events[key] = Event(
                d[key]["title"],
                d[key]["description"],
                datetime.fromisoformat(d[key]["date"]),
                datetime.fromisoformat(d[key]["duration"]),
                d[key]["repeats"],
                d[key]["frequency"]
            )
        return events


    # d is a dictionary containing events
    def _makeClassEvent(self, d):
        events = {}
        for key in d:
            events[key] = ClassEvent(
                d[key]["title"],
                d[key]["description"],
                datetime.fromisoformat(d[key]["date"]),
                datetime.fromisoformat(d[key]["duration"]),
                d[key]["repeats"],
                d[key]["frequency"] )
        return events


    # creates and pushes empty calendar into calendar table
    # creates and adds database entry it into the database
    def createCalendar(self, title: str, color: str, official: bool):
        self.calendars_tb[title] = Calendar(title, color, official)

        # allocate entry
        entry = {
            "title": title,
            "events": {},
            "is_official": official,
            "color": color
        }

        # set entry into the calendar db
        self.calendar_db[title] = entry


    def editCalendar(self,  calendar: str, 
                            title: str = None, 
                            color: str = None):
        # check if calendar exists..
        if calendar in self.calendars_tb:
            item = self.calendars_tb[calendar]
            # title change also requires key change
            if (item.official is False) and (title != None):
                self.calendars_tb.pop(calendar)
                self.calendars_tb[title] = item  # insert new element into the database
                item.title = title
            if color is not None:
                item.color = color

        # edit this in the db
        if calendar in self.calendar_db:
            item = self.calendar_db[calendar]
            # title change also requires update on db
            if (item["is_official"] is False) and (title is not None):
                self.calendar_db.pop(calendar)
                self.calendar_db[title] = item  # insert new element into the database
                item["title"] = title
            if color is not None:
                item["color"] = color


    def deleteCalendar(self, calendar: str):
        if (self.calendars_tb[calendar].official == False) and (calendar in self.calendars_tb):
            del self.calendars_tb[calendar]
            del self.calendar_db[calendar]



    def createEvent(self,   calendar: str,
                            title: str, 
                            description: str, 
                            date: datetime, 
                            duration: datetime, 
                            repeats: bool,
                            frequency: int):
        if (self.calendars_tb[calendar].official == False):
            self.calendars_tb[calendar].createEvent(
                title, description, date, duration, repeats, frequency)


    def editEvent(self, calendar: str,
                        event: str,
                        title: str = None, 
                        description: str = None, 
                        date: datetime = None, 
                        duration: datetime = None, 
                        repeats: bool = None,
                        frequency: int = None):
        if (self.calendars_tb[calendar].official == False):
            self.calendar[calendar].editEvent(
                event, title, description, date, duration, repeats, frequency)


    def deleteEvent(self, calendar: str, event: str):
        if (self.calendars_tb[calendar].official == False):
            self.calendars_tb[calendar].deleteEvent(event)


    def transferEvent(self, source: str, 
                            dest: str, 
                            event: str):
        sourceOfficial = self.calendars_tb[source].official
        destOfficial = self.calendars_tb[dest].official

        if sourceOfficial == False and destOfficial == False:
            original = self.calendars_tb[source].events[event]

            self.calendars_tb[dest].events[event] = original
            self.calendars_tb[source].deleteEvent(event)
