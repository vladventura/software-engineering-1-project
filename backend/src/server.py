# server service file
from fastapi import FastAPI
from Calendar import CalendarManager, CalendarEventModel
from Database import Database
from pydantic import BaseModel

app = FastAPI()

class CalendarEventRequest(BaseModel):
    calendar: str
    model: CalendarEventModel

@app.post("/api/calendar/event")
async def createEvent(request: CalendarEventRequest):
    db = Database()
    cm = CalendarManager(db)
    cm.createEvent(request.calendar, request.model)
    db.update()
    return '{"status": "success"}'

@app.put("/api/calendar/event")
async def editEvent(request: CalendarEventRequest):
    db = Database()
    cm = CalendarManager(db)
    # edit call to change events
    cm.editEvent(request.calendar, request.model)
    db.update()
    return '{"status": "success"}'

@app.delete("/api/calendar/event")
async def deleteEvent(request: CalendarEventRequest):
    db = Database()
    cm = CalendarManager(db)
    cm.deleteEvent(request.calendar, request.model)
    db.update()
    return '{"status": "success"}'

if __name__ == "__main__":
    pass
