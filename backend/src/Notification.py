# BASIC PROPOSAL
# - Notification is to be set at beginning of the launch of the program.
# - The manager should set it as a system timed event and the event activates notification on event handler

from datetime import datetime, time
from Database import Database, database
from enum import Enum, auto
from pydantic import BaseModel

class NotificationMethod(Enum):
    EMAIL = auto()
    SMS   = auto()
    BOTH  = auto()
    MUTE  = auto()


class NotificationModel(BaseModel):
    calendar: str
    event: str
    method: NotificationMethod
    date :datetime
    triggerWindow: datetime
    frequency: int
    repeats: bool


'''
    Couple things to deal with for this class
    1. We need to be able to pull data from database for notifications
    - on construction - the notificationmanager should pull data from database.
    2. createNotification is only used to add thigns to the database
    - this should also add notification to the event to be triggered.
    - event handler for python needs research for a proper implementation
    3. deleteNotification - is it possible to modify events that are queued to trigger from python?
    - deletes from database everytime this is successfully handled.
    4. editNotification
    - requires writing to database as well.
'''
class NotificationManager:
    NUL = "null"
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
        NotificationModel
        notif = NotificationModel(
            calendar        = json_o["calendar"],
            event           = json_o["event"],
            date            = datetime.fromisoformat(json_o["date"]),
            triggerWindow   = datetime.fromisoformat(json_o["window"]),
            repeats         = json_o["repeats"],
            frequency       = json_o["frequency"],
            method          = json_o["method"] )
        return notif
    
    ''' createNotification
    pass request model in as an argument and push it into the table.
    change the model to dictionary type so it can be used with the json object.
    '''
    def createNotification(self, model:NotificationModel):
        # add onto notification table
        # key is concantenation of calendar string and event string
        self.notifs_table[model.calendar+model.event] = model
        self.notifications[model.calendar+model.event] = model.__dict__
        # TODO ADD this notification to event handler


    # Removes associated notification from database and internal table storage for notifications
    # Also removes the notifications from event pool TODO-implement this feature
    def deleteNotification(self, model:NotificationModel):
        key = model.calendar+model.event
        #TODO add removal of notifications from event
        try:
            # remove from database with stored reference to the json dictionary.
            if (key) in self.notifications:
                del self.notifications[key]

            # remove from table as well
            if (key) in self.notifs_table:
                del self.notifs_table[key]
        except:
            print("ERROR deleteNotification")



    # Modify notification object
    # also modify the database through stored reference
    def editNotification(self, model:NotificationModel):
        try:
            key = model.calendar+model.event
            # find and modify the notification item
            if (key) in self.notifs_table:
                item = self.notifs_table[key]  # get the object to mocify
                if (model.repeats is not self.NUL):   item.repeats    = model.repeats
                if (model.method is not  self.NUL):   item.method     = model.method
            # find and modify the data entry
            if (key) in self.notifications:
                entry = self.notifications[key]
                if (model.repeatss is not self.NUL):  entry["repeats"] = model.repeats
                if (model.method is not self.NUL):    entry["method"]  = model.method.name
        except:
            print("ERROR editNotification")
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

# module variable
notificationMan = NotificationManager(database)
