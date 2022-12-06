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

@app.post("/api/calendar/event")
async def createEventRequest(request: CalendarEventRequest):
    calendarManager.createEvent(request.calendar, request.model)
    database.update()
    return '{"status": "success"}'

@app.put("/api/calendar/event")
async def editEventRequest(request: CalendarEventRequest):
    # edit call to change events
    calendarManager.editEvent(request.calendar, request.model)
    database.update()
    return '{"status": "success"}'

@app.delete("/api/calendar/event")
async def deleteEventRequest(request: CalendarEventRequest):
    calendarManager.deleteEvent(request.calendar, request.model)
    database.update()
    return '{"status": "success"}'

@app.put("/api/calendar/transfer")
async def transferEventRequest(request: CalendarTransferRequest):
    calendarManager.transferEvent(request.src, request.dst, request.event_title)
    database.update()
    return '{"status": "transfer success"}'

@app.post("/api/calendar")
async def createCalendarRequest(request: CalendarRequest):
    calendarManager.createCalendar(request.model)
    database.update()
    return '{"status": "calendar created success"}'

@app.delete("/api/calendar")
async def deleteCalendarRequest(request: CalendarRequest):
    calendarManager.deleteCalendar(request.calendar)
    database.update()
    return '{"status": "calendar created success"}'

@app.put("/api/calendar")
async def editCalendarRequest(request: CalendarRequest):
    calendarManager.editCalendar(request.calendar, request.model)
    database.update()
    return '{"status": "calendar created success"}'

@app.post("/api/calendar/notification")
async def createNotificationRequest(request: NotificationModel):
    notificationMan.createNotification(request)
    database.update()
    return '{"status:": "notification creation success"}'

@app.put("/api/calendar/notification")
async def editNotificationRequest(request: NotificationModel):
    notificationMan.editNotification(request)
    database.update()
    return '{"status:": "notification edit success"}'

@app.delete("/api/calendar/notification")
async def deleteNotificationRequest(request: NotificationModel):
    notificationMan.deleteNotification(request)
    database.update()
    return '{"status:": "notification delete success"}'


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
        return '{"status:": Failure}'


if __name__ == "__main__":
    pass
