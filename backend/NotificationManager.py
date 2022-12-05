# Notification Manager
# 
# Written by: Max Tighe
#
# Notification Manager Description: Class designed to store and manage notifications
#
#

import datetime
from Notification import Notification
from Database import Database

class NotificationManager:

    targetEmail = str
    #change this later to have a target email from the database

    def __init__(self, database: Database):
        # NOTE: notification contains reference to notifications portion of the data
        self.notifications = database.getNotifData()
        self.notifs_table = {} # dictionary containing Notification objects

        # convert json data table into actual notification objects.
        for k in self.notifications:
            # create key string for the table and insert in elements
            self.notifs_table[k] = self._jsonToNotification(self.notifications[k])

        # TODO ADD all events in notifications to future events

    # create notification from json object
    def _jsonToNotification(self, json_o):
        notif = Notification(json_o["calendar"], json_o["event"],
        datetime.datetime.fromisoformat(json_o["date"]), datetime.time.fromisoformat(json_o["window"]),
        json_o["repeats"], json_o["frequency"], json_o["method"])

        return notif

    # check all notifications to see if any are supposed to occur.
    # If current date is after (Event date - window),
    # then call notif's SendNotification().
    def checkNotifications(self):
        for n in self.notifs_table:
            if(datetime.now() < (n.date - n.window)):
                n.sendNotification("etighe238@gmail.com") # replace this target email later

                if(n.repeats):
                        n.date += n.frequency

                else: # delete if notification doesn't repeat and has triggered
                    self.deleteNotification(n)

    def createNotification(self, calendar, event, date, window, repeats, frequency, method):
        temp = Notification(calendar, event, date, window, repeats, frequency, method)

        self.notifs_table[calendar+event] = temp
        #Update database

    def deleteNotification(self, calendar, event):
        for i in self.notifs_table:
            if(i.calendar == calendar):
                if(i.event == event):
                    self.notifs_table.pop(calendar+event)
                    #Update database


    def editNotification(self, calendar, event, window = None,
                 repeats = None, frequency = None, method = None):
        for i in self.notifs_table:
            if(i.calendar == calendar):
                if(window != None): 
                    i.window = window
                if(repeats != None):
                    i.repeats = repeats
                if(frequency != None):
                    i.frequency = frequency
                if(method != None):
                    i.method = method
                #Update database