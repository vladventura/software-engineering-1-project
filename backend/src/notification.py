# BASIC PROPOSAL
# - Notification is to be set at beginning of the launch of the program.
# - The manager should set it as a system timed event and the event activates notification on event handler

import time
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
    def __init__(self):
        self.notifications = []  # hmm need to think about data class to handle this
                                 # TODO Potentially use python dictionary?
    
    # TODO implement
    def createNotification(self, calendar, event, window, repeats, frequency, method):
        pass

    # TODO implement
    def deleteNotification(self, calendar, event):
        pass

    # TODO implement
    def editNotification(self, calendar, event, repeats, method):
        pass
