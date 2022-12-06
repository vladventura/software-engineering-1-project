# server service file
from fastapi import FastAPI
from Calendar import CalendarManager, calendarManager, CalendarEventModel, CalendarModel
from Database import Database, database
from Notification import NotificationManager, notificationMan, NotificationModel
from pydantic import BaseModel

app = FastAPI()

class CalendarEventRequest(BaseModel):
    calendar: str
    model: CalendarEventModel

class CalendarTransferRequest(BaseModel):
    src: str
    dst: str
    event_title: str

class CalendarRequest(BaseModel):
    calendar: str
    model: CalendarModel

''' Example input
{
    "calendar": "Personal1",
    "model": {
        "title":        "Bull crap",
        "description":  "Loads of bull - LOADS of bull",
        "date":         "2022-12-05T11:59:59",
        "duration":     "2022-12-06T11:59:59",
        "repeats":      false,
        "frequency":    0
    }
}
'''
@app.post("/api/calendar/event")
async def createEventRequest(request: CalendarEventRequest):
    try:
        calendarManager.createEvent(request.calendar, request.model)
        database.update()
        return '{"status": "success"}'
    except:
        return '{"status": "create event request failure"}'


''' Put request example
{
    "calendar": "Personal1",
    "model": {
        "title":        "Bull crap",
        "description":  "Loads of bull MEN",
        "date":         "2022-12-05T11:59:59",
        "duration":     "2022-12-06T11:59:59",
        "repeats":      1,
        "frequency":    0
    }
}
'''
@app.put("/api/calendar/event")
async def editEventRequest(request: CalendarEventRequest):
    try:
        # edit call to change events
        calendarManager.editEvent(request.calendar, request.model)
        database.update()
        return '{"status": "success"}'
    except:
        return '{"status": "edit event request failure"}'



''' Example of a delete request
{
    "calendar": "Personal1",
    "model": {
        "title":        "Bull crap",           # NOTE can be "null"
        "description":  "Loads of bull MEN",   # NOTE can be "null"
        "date":         "2022-12-05T11:59:59", # NOTE these have to be valid iso datetime format
        "duration":     "2022-12-06T11:59:59", # NOTE these have to be valid iso datetime format
        "repeats":      1,
        "frequency":    0
    }
}
'''
@app.delete("/api/calendar/event")
async def deleteEventRequest(request: CalendarEventRequest):
    try:
        calendarManager.deleteEvent(request.calendar, request.model)
        database.update()
        return '{"status": "success"}'
    except:
        return '{"status": "delete event request falure"}'


'''
{
    "src": "Personal2",
    "dst": "Personal1",
    "event_title": "Christmas!"
}
'''
@app.put("/api/calendar/transfer")
async def transferEventRequest(request: CalendarTransferRequest):
    try:
        calendarManager.transferEvent(request.src, request.dst, request.event_title)
        database.update()
        return '{"status": "transfer success"}'
    except:
        return '{"status": "transfer event request failure"}'


''' create calender request example
{
    "calendar": "calender name",
    "model": {
        "title":"calender name",
        "events":{},
        "is_official": false,
        "color": "color hex code"
    }
}
'''
@app.post("/api/calendar")
async def createCalendarRequest(request: CalendarRequest):
    try:
        calendarManager.createCalendar(request.model)
        database.update()
        return '{"status": "calendar created success"}'
    except:
        return '{"status": "calender post request failure"}'


''' delete calender request example
{
    "calendar": "calender name",
    "model": {
        "title":"calender name",
        "events":{},
        "is_official": false,
        "color": "color hex code"
    }
}
'''
@app.delete("/api/calendar")
async def deleteCalendarRequest(request: CalendarRequest):
    try:
        calendarManager.deleteCalendar(request.calendar)
        database.update()
        return '{"status": "calendar created success"}'
    except:
        return '{"status": "calender delete request failure"}'


''' put calender request example
    if title same - don't change title
{
    "calendar": "Personal3",  # Old title
    "model": {
        "title":"Personal4",  # New Title
        "events":{},          # in general just empty {}
        "is_official": false, # NOTE true prevents edit
        "color": "#AAAAAA"    # NOTE can be "null"
    }
}
'''
@app.put("/api/calendar")
async def editCalendarRequest(request: CalendarRequest):
    try:
        calendarManager.editCalendar(request.calendar, request.model)
        database.update()
        return '{"status": "calendar created success"}'
    except:
        return '{"status": "edit calender request failure."}'


''' create notification request example
{
    "calendar": "calender title",
    "event": "event title",
    "date": "2022-12-06T23:59:00",          # NOTE must be in datetime iso format
    "triggerWindow": "2022-12-06T21:59:00", # NOTE must be in datetime iso format
    "repeats": false,
    "frequency": 0,
    "method": 1
}
'''
@app.post("/api/calendar/notification")
async def createNotificationRequest(request: NotificationModel):
    try:
        notificationMan.createNotification(request)
        database.update()
        return '{"status:": "notification creation success"}'
    except:
        return '{"status:": "create notification request failure"}'



''' edit notification request example
{
    "calendar": "calender title",
    "event": "event title",
    "date": "2022-12-06T23:59:00",          # NOTE must be in datetime iso format
    "triggerWindow": "2022-12-06T21:59:00", # NOTE must be in datetime iso format
    "repeats": false,
    "frequency": 0,
    "method": 1
}
'''
@app.put("/api/calendar/notification")
async def editNotificationRequest(request: NotificationModel):
    try:
        notificationMan.editNotification(request)
        database.update()
        return '{"status:": "notification edit success"}'
    except:
        return '{"status:": "edit notification request failure"}'



''' delete notification request example
{
    "calendar": "calender title",           # NOTE titles are concatenated
    "event": "event title",                 # NOTE titles are concatenated
    "date": "2022-12-06T23:59:00",          # NOTE must be in datetime iso format
    "triggerWindow": "2022-12-06T21:59:00", # NOTE must be in datetime iso format
    "repeats": false,                       # NOTE value here doesn't matter
    "frequency": 0,                         # NOTE value here doesn't matter
    "method": 1                             # NOTE value here doesn't matter
}
'''
@app.delete("/api/calendar/notification")
async def deleteNotificationRequest(request: NotificationModel):
    try:
        notificationMan.deleteNotification(request)
        database.update()
        return '{"status:": "notification delete success"}'
    except:
        return '{"status:": "delete notification request failure"}'


''' EXAMPLE of a request item..
Singular item is grabbed for unique event string
{
    "calendar": "Personal1",
    "model": {
        "title":        "Bull crap",
        "description":  "Loads of bull - LOADS of bull",
        "date":         "2022-12-05T11:59:59",
        "duration":     "2022-12-06T11:59:59",
        "repeats":      false,
        "frequency":    0
    }
}
If request event title has keyword "__all" then all events in the calendar are returned.
{
    "calendar": "Personal1",
    "model": {
        "title":        "__all",
        "description":  "Loads of bull - LOADS of bull",
        "date":         "2022-12-05T11:59:59",
        "duration":     "2022-12-06T11:59:59",
        "repeats":      false,
        "frequency":    0
    }
}
'''
@app.get("/api/calendar/event")
async def getEvent(request: CalendarEventRequest):
    try:
        events = calendarManager.getEvent(request.calendar, request.model.title)
        print(events)
        return events
    except:
        return '{"status:": "get event request failure"}'


''' getCalendar
If calendar field is __all grab all
Otherwise grab a specific calendar object - without its events In generic form...
{
    "calendar": "title",
    "model": {
        "title":"title",
        "events":{},
        "is_official": false,
        "color": "#FFFFFF"
    }
}
'''
@app.get("/api/calendar")
async def getCalendar(request: CalendarRequest):
    try:
        return calendarManager.getCalendar(request.calendar)
    except:
        return '{"status:": "get calender request failure"}'




if __name__ == "__main__":
    pass
