# Notification Manager
# 
# Written by: Max Tighe
#
# Notification Manager Description: Class designed to store and manage notifications
#
#

import datetime
import Notification

class NotificationManager:

    targetEmail = str
    #change this later to have a target email from the database

    def checkNotifications():
        pass
    # If current date is after (Event date - window)
    # Then call notif's SendNotification()

    def createNotification(self, calendar, event, window, repeats, frequency, method):
        temp = Notification(calendar, event, window, repeats, frequency, method)

        self.notifList.append(temp)
        #Update database

    def deleteNotification(self, calendar, event):
        for i in self.notifList:
            if(i.calendar == calendar):
                if(i.event == event):
                    self.notifList.remove
                    #Update database


    def editNotification(self, calendar, event, window = None,
                 repeats = None, frequency = None, method = None):
        for i in self.notifList:
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