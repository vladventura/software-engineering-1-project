# Notification Manager
# 
# Written by: Max Tighe
#
# Notification Manager Description: Class designed to store and manage notifications
#
#

import datetime
#import Notification.py

#PLACEHOLDER CLASS, GET NOTIFICATION CLASS ASAP
class Notification:
    calendar = str
    event = str
    window = datetime.time

    repeats = bool

    frequency = int

    method = int

    def __init__(self, calendar, event, window, repeats, frequency, method):
        self.calendar = calendar
        self.event = event
        self.window = window
        self.repeats = repeats
        self.frequency = frequency
        self.method = method

class NotificationManager:
    
    notifList = list

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