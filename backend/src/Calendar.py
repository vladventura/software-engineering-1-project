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
from Database import Database, database
from pydantic import BaseModel

class CalendarEventModel(BaseModel):
    title: str
    description: str
    date: datetime
    duration: datetime
    repeats: bool
    frequency: int

class CalendarClassEventModel(CalendarEventModel):
    submitted: bool
    grade: float

class CalendarModel(BaseModel):
    title: str
    events: dict
    is_official: bool
    color: str

class Calendar:
    NUL = "null"  # constant since request cannot contain null type
    def __init__(self, title: str, color: str, official: bool):
            self.title = title
            self.color = color
            self.official = official
            self.events = {}


    def createEvent(self, calendarEventModel: CalendarEventModel):
        self.events[calendarEventModel.title] = calendarEventModel


    def editEvent(self, event: CalendarEventModel):
        item = self.events[event.title]
        if event.title is not self.NUL:       item.title = event.title
        if event.description is not self.NUL: item.description = event.description
        if event.date is not self.NUL:        item.date = event.date
        if event.duration is not self.NUL:    item.duration = event.duration
        if event.repeats is not self.NUL:     item.repeats = event.repeats
        if event.frequency is not self.NUL:   item.frequency = event.frequency


    def deleteEvent(self, event: str):
        self.events.pop(event)



class CalendarManager:
    NUL = "null" # constant since request cannot contain null type
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
    def createCalendar(self, model: CalendarModel):
        self.calendars_tb[model.title] = Calendar(model.title, model.color, model.is_official)
        # Put the model being constructed into the database
        self.calendar_db[model.title] = model.__dict__


    def editCalendar(self,  calendar: str, model: CalendarModel):
        # check if calendar exists..
        if calendar in self.calendars_tb:
            item = self.calendars_tb[calendar]
            # title change also requires key change
            if (item.official is False) and (model.title != self.NUL):
                self.calendars_tb.pop(calendar)
                self.calendars_tb[model.title] = item  # insert new element into the database
                item.title = model.title
            if model.color is not self.NUL:
                item.color = model.color

        # edit this in the db
        if calendar in self.calendar_db:
            item = self.calendar_db[calendar]
            # title change also requires update on db
            if (item["is_official"] is False) and (model.title is not self.NUL):
                self.calendar_db.pop(calendar)
                self.calendar_db[model.title] = item  # insert new element into the database
                item["title"] = model.title
            if model.color is not self.NUL:
                item["color"] = model.color


    # find and delete objects identified by the calendar string from database and table.
    def deleteCalendar(self, calendar: str):
        if (self.calendars_tb[calendar].official == False) and (calendar in self.calendars_tb):
            del self.calendars_tb[calendar]
            del self.calendar_db[calendar]



    # create a specified - insert this object into appropriate database and table
    def createEvent(self, calendar: str, event: CalendarEventModel):
        # we cannot create events for an official calendar
        if (self.calendars_tb[calendar].official == False):
            self.calendars_tb[calendar].createEvent(event)
            self.calendar_db[calendar]["events"][event.title] = event.__dict__



    def _updateTitle(self, json_calendar, event, new_title):
        item  = json_calendar.pop(event)
        item["title"] = new_title
        json_calendar[event] = item

    def editEvent(self, calendar: str, event: CalendarEventModel, title: str = NUL):
        if (self.calendars_tb[calendar].official == False):
            self.calendars_tb[calendar].editEvent(event)
            item = self.calendar_db[calendar]["events"][event.title]
            if title              is not self.NUL: self._updateTitle(self.calendar_db[calendar], event.title, title)
            if event.description  is not self.NUL: item["description"]    = event.description
            if event.date         is not self.NUL: item["date"]           = str(event.date)
            if event.duration     is not self.NUL: item["duration"]       = str(event.duration)
            if event.repeats      is not self.NUL: item["repeats"]        = event.repeats
            if event.frequency    is not self.NUL: item["frequency"]      = event.frequency


    def deleteEvent(self, calendar: str, event: str):
        if (self.calendars_tb[calendar].official == False):
            self.calendars_tb[calendar].deleteEvent(event.title)
            del self.calendar_db[calendar]["events"][event.title]  # deletes line from database


    def transferEvent(self, source: str, dest: str, event: str):
        sourceOfficial = self.calendars_tb[source].official
        destOfficial = self.calendars_tb[dest].official

        if sourceOfficial == False and destOfficial == False:
            original = self.calendars_tb[source].events[event]

            self.calendars_tb[dest].events[event] = original
            self.calendars_tb[source].deleteEvent(event)
            
            db_src = self.calendar_db[source]["events"]
            db_dst = self.calendar_db[dest]["events"]
            if event in db_src:
                item = db_src.pop(event)
                db_dst[event] = item

# module variable exports
calendarManager = CalendarManager(database)
