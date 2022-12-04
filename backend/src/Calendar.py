# Calendar classes
#
# A calendar stores events and has the ability to edit them.
#
# The calendar manager controls each calendar and determines
# which properties of calendars will be modified, depending
# on if they are official or not.
#

import Event
import datetime
from database import Database

class Calendar:
    def __init__(self, title: str, color: str, official: bool):
        self.title = title
        self.color = color
        self.official = official
        self.events = {}

    def createEvent(self, 
            title: str, 
            description: str, 
            date: datetime.datetime, 
            duration: datetime.datetime, 
            repeats: bool,
            frequency):
        self.events[title] = Event(
            title, description, date, duration, repeats, frequency)

    def editEvent(self, 
            event: str, 
            title: str = None, 
            description: str = None, 
            date: datetime.datetime = None, 
            duration: datetime.datetime = None, 
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
        self.calendars = {}
        # initialize database
        self.calendars_db = database.getCalendarData()

    def createCalendar(self, title: str, color: str, official: bool):
        self.calendars[title] = Calendar(title, color, official)

    def editCalendar(self,
    calendar: str, 
    title: str = None, 
    color: str = None):
        if (self.calendars[calendar].official == False):
            if title != None:
                self.calendars[calendar].title = title
        if color != None:
            self.calendars[calendar].color = color

    def deleteCalendar(self, calendar: str):
        if (self.calendars[calendar].official == False):
            self.calendars.pop(calendar)

    def createEvent(self,
        calendar: str,
        title: str, 
        description: str, 
        date: datetime.datetime, 
        duration: datetime.datetime, 
        repeats: bool,
        frequency: int):
        if (self.calendars[calendar].official == False):
            self.calendars[calendar].createEvent(
                title, description, date, duration, repeats, frequency)

    def editEvent(self,
        calendar: str,
        event: str,
        title: str = None, 
        description: str = None, 
        date: datetime.datetime = None, 
        duration: datetime.datetime = None, 
        repeats: bool = None,
        frequency: int = None):
        if (self.calendars[calendar].official == False):
            self.calendar[calendar].editEvent(
                event, title, description, date, duration, repeats, frequency)

    def deleteEvent(self, calendar: str, event: str):
        if (self.calendars[calendar].official == False):
            self.calendars[calendar].deleteEvent(event)

    def transferEvent(self, 
        source: str, 
        dest: str, 
        event: str):
        sourceOfficial = self.calendars[source].official
        destOfficial = self.calendars[dest].official

        if sourceOfficial == False and destOfficial == False:
            original = self.calendars[source].events[event]

            self.calendars[dest].events[event] = original
            self.calendars[source].deleteEvent(event)
