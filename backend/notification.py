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
    event = str

    date = datetime.datetime
    window = datetime.time

    repeats = bool
    frequency = datetime.time
    method = int

    def __init__(self, calendar, event, date, window=datetime.time(0), 
    repeats=False, frequency=0, method=0):
        self.calendar = calendar
        self.event = event
        self.date = date
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

    msg1 = "Your event "
    msg2 = "from "
    msg3 = " is occurring soon! \n\n"
    msgwhen = "Occurring on: "
    msgwhen2 = "At: "
    msgEnd = "\t - Blackboard Calendar"
    msgDate1 = str(date)[:10]
    msgDate2 = str(date)[10:19]
    msgnl = "\n"

    message = (msg1 + str(event) + msg2 +
    str(calendar) + msg3 + msgnl + msgwhen +
    msgDate1 + msgnl + msgwhen2 + msgDate2 + msgnl 
    + msgnl + msgEnd)

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