from enum import Enum
import datetime
import Calendar
import Database
import Event
import EventTest
import Notification
import NotificationManager

class EventType(Enum):
    CREATECALENDAR = 1
    EDITCALENDAR = 2
    DELETECALENDAR = 3
    CREATEEVENT = 4
    EDITEVENT = 5
    DELETEEVENT = 6
    CREATENOTIFICATION = 7
    EDITNOTIFICATION = 8
    DELETENOTIFICATION = 9
    TRANSFEREVENT = 10
    DISPLAYEVENTINFO = 11
    EXPORTCALENDAR = 12

class DisplayMode(Enum):
    MONTHLY = 1
    WEEKLY = 2
    DAILY = 3

class CalendarDisplay:
    def __init__(self):
        self.date = datetime.date
        self.mode = DisplayMode.MONTHLY

    def handleEvent(self, event: EventType):
        match event:
            case EventType.CREATECALENDAR:
                pass
            case EventType.EDITCALENDAR:
                pass
            # ...
            case other:
                pass

    def refreshDisplay(self):
        pass

    #this differs from our class diagram, we prolly need to
        # give this a calendar to toggle, but does that mean
        # each calendar also needs a visibility bool?
    def toggleCalendarVisibility(self): #(self, calendar)
        # CalendarManager.toggle(calendar)
        pass

    def changeMode(self, mode):
        self.mode = mode

    def changeDate(self, date):
        self.date = date

    #print calendar
    #export calendar
