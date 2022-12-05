# BASIC PROPOSAL
# - Notification is to be set at beginning of the launch of the program.
# - The manager should set it as a system timed event and the event activates notification on event handler

from datetime import datetime, time
from Database import Database
from enum import Enum, auto

class NotificationMethod(Enum):
    EMAIL = auto ()
    SMS   = auto()
    BOTH  = auto()
    MUTE  = auto()

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
        self.notifications = database.getNotifData()
        self.notifs_table = {} # dictionary containing Notification objects

        # convert json data table into actual notification objects.
        for key in self.notifications:
            # create key string for the table and insert in elements
            self.notifs_table[key] = self._jsonToNotification(self.notifications[key])

        # TODO ADD all events in notifications to future events

    # create notification from json object
    def _jsonToNotification(self, json_o):
        notif = Notification()
        notif.calendar                  = json_o["calendar"]
        notif.event                     = json_o["event"]
        notif.info.date                 = datetime.fromisoformat(json_o["date"])
        notif.info.triggerWindow        = time.fromisoformat(json_o["window"])
        notif.info.repeat               = json_o["repeats"]
        notif.info.frequency            = json_o["frequency"]
        notif.method                    = NotificationMethod[json_o["method"]]
        
        return notif
    
    # After calling this methode. Make sure to ask db to update to keep it up to date
    # NOTE database should be called to update after creating notification
    def createNotification(self, calendar, event, window, repeats, frequency, method, date):
        new_notif = Notification()
        new_notif.calendar              = calendar
        new_notif.event                 = event
        new_notif.info.date             = date
        new_notif.info.triggerWindow    = window
        new_notif.info.repeat           = repeats
        new_notif.info.frequency        = frequency
        new_notif.method                = method

        # add onto notification table
        # key is concantenation of calendar string and event string
        self.notifs_table[calendar+event] = new_notif

        # now that new notification has been configured. Insert into database.
        self.notifications[calendar+event] = {  
            "calendar":  calendar,
            "event":     event,
            "date":      str(date),
            "window":    str(time),
            "repeats":   repeats,
            "method":   new_notif.method.name
        }

        # TODO ADD this notification to event handler


    # Removes associated notification from database and internal table storage for notifications
    # Also removes the notifications from event pool TODO-implement this feature
    def deleteNotification(self, calendar, event):
        key = calendar+event
        #TODO add removal of notifications from event
        try:
            # remove from database with stored reference to the json dictionary.
            if (key) in self.notifications:
                del self.notifications[key]

            # remove from table as well
            if (key) in self.notifs_table:
                del self.notifs_table[key]
        except:
            print("ERROR: deleteNotification")



    # Modify notification object
    # also modify the database through stored reference
    def editNotification(self, calendar, event, repeats = None, method = None):
        try:
            key = calendar+event
            # find and modify the notification item
            if (key) in self.notifs_table:
                item = self.notifs_table[key]  # get the object to mocify
                if (repeats is not None):   item.info.repeat = repeats
                if (method is not  None):   item.method      = method
            # find and modify the data entry
            if (key) in self.notifications:
                entry = self.notifications[key]
                if (repeats is not None):   entry["repeats"] = repeats
                if (method is not None):    entry["method"]  = method.name
        except:
            print("ERROR: editNotification")
        # TODO IMPLEMENT notification edit

    # implemented for test case
    def getObject(self, calendar, event):
        key = calendar+event
        item = None
        if key in self.notifs_table:
            item = self.notifs_table[key]
        return item

    # implemented for test case
    def getDbObject(self, calendar, event):
        key = calendar+event
        entry = None
        if key in self.notifications:
            entry = self.notifications[key]
        return entry
