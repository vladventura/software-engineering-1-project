# BASIC PROPOSAL
# - Notification is to be set at beginning of the launch of the program.
# - The manager should set it as a system timed event and the event activates notification on event handler

import time
from database import Database
from enum import Enum

class NotificationMethod(Enum):
    EMAIL = Enum.auto ()
    SMS = Enum.auto()
    BOTH = Enum.auto()
    MUTE = Enum.auto()

class NotificationInfo:
    def __init__(self):
        self.date = None
        self.triggerWindow = None
        self.frequency = 0  # amount of time for this notification to be triggered by
        self.repeat = False # boolean for how many times this notification is to be handled.

class Notification:
    def __init__(self):
        self.info = NotificationInfo()
        self.calendar = ""  # string identifier for calendar
        self.event = ""     # string identifier for event
        self.method = NotificationMethod.MUTE

    def sendNotification(self):
        pass


# Couple things to deal with for this class
# 1. We need to be able to pull data from database for notifications
#    - on construction - the notificationmanager should pull data from database.
# 2. createNotification is only used to add thigns to the database
#    - this should also add notification to the event to be triggered.
#    - event handler for python needs research for a proper implementation
# 3. deleteNotification - is it possible to modify events that are queued to trigger from python?
#    - deletes from database everytime this is successfully handled.
# 4. editNotification
#    - requires writing to database as well.
class NotificationManager:
    def __init__(self, database: Database):
        # NOTE: notification contains reference to notifications portion of the data
        self.notifications = database.readAllNotifData()

        # TODO ADD all events in notifications to future events
    
    # After calling this methode. Make sure to ask db to update to keep it up to date
    def createNotification(self, calendar, event, window, repeats, frequency, method, date):
        new_notif = Notification()
        new_notif.calendar = calendar
        new_notif.event = event
        new_notif.info.date = date
        new_notif.info.triggerWindow = window
        new_notif.info.repeat = repeats
        new_notif.info.frequency = frequency
        new_notif.method = method

        # now that new notification has been configured. Insert into database.
        self.notifications[calendar+event] = {
            "calendar": calendar,
            "event": event,
            "date": date,     # FIXME needs to convert this to string
            "window": window, # FIXME needs to convert this to string
            "repeats": repeats,
            "methode": new_notif.method.name
        }

        # TODO ADD this notification to event handler


    # TODO implement
    def deleteNotification(self, calendar, event):
        pass


    # TODO implement
    def editNotification(self, calendar, event, repeats, method):
        pass

