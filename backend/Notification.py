# BASIC PROPOSAL
# - Notification is to be set at beginning of the launch of the program.
# - The manager should set it as a system timed event and the event activates notification on event handler

#
#   Cowritten by: Max Tighe
#


import datetime
import smtplib, ssl #email functionality
from enum import Enum

import Event

class Notification:
    
    class NotificationMethod(Enum):
        MUTE = 0
        EMAIL = 1
        SMS = 2
        BOTH = 3
    
    calendar = str
    event = Event # to store event's info
    window = datetime.time

    repeats = bool
    frequency = int
    method = int

    def __init__(self, calendar, event, window, repeats=False, frequency=0, method=0):
        self.calendar = calendar
        self.event = event
        self.window = window
        self.repeats = repeats
        self.frequency = frequency
        self.method = method

    #This email login portion should be moved to Notification Manager
    #once functionality has been tested.
    port = 465
    targetEmail = "etighe238@gmail.com"
    #change this later to have a target email from the database
    email = "sofengcalbot@gmail.com"
    password = "ntrtiaxuuciofaxt"

    message = "Your event " + event.title + "from " + calendar
    + "is occurring soon! \n\n" 
    + "Description: " + event.description + "\n"
    + "Occurring on: " + event.date.strftime("%m/%d/%Y") + "\n"
    + "At: " + event.date.strftime("%H:%M:%S") + "\n\n"
    + "\t - Blackboard Calendar"

    context = ssl.create_default_context()

    def sendNotification(self, targetEmail):
        if(self.method == 0):
            pass

        elif(self.method == 1):
            with smtplib.SMTP_SSL("smtp.gmail.com", self.port, context=self.context) as server:
                server.login("sofengcalbot@gmail.com", "ntrtiaxuuciofaxt")
                server.sendmail("sofengcalbot@gmail.com", targetEmail, "Test email")
                #change this later to have a target email from the database

#sofengcalbot@gmail.com
# ntrtiaxuuciofaxt


# use debugging server with "python -m smtpd -c DebuggingServer -n localhost:1025" in cmd shell.


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


# Added NotificationManager.py