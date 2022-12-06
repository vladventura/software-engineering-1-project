# server service file
from fastapi import FastAPI
from Calendar import CalendarManager, calendarManager, CalendarEventModel, CalendarModel
from Database import Database, database
from Notification import NotificationManager, notificationMan, NotificationModel
from pydantic import BaseModel
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

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

@app.put("/api/calendar/notification/send")
async def sendNotification(request):
    # https://realpython.com/python-send-email/
    print("Beginning email sending process")

    smtp_server = "smtp.gmail.com"
    sender_email = "sofengcalbot@gmail.com"
    receiver_email = request
    password = os.getenv("BOT_PASSWORD")

    message = MIMEMultipart("alternative")
    message['Subject'] = "Notification creation successful"
    message['From'] = sender_email
    message['To'] = receiver_email

    text = """Your notification has been created successfully!"""
    part1 = MIMEText(text, "plain")

    message.attach(part1);


    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())

    print("Email sent successfully")
    return {'code': 200}


if __name__ == "__main__":
    pass
