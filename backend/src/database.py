# Author: Zachary McCann
# COMP.4110-201 Software Engineering I 
# Team 6, Enhanced Blackboard Calendar
# 
# Database Class
# + writeEvent(targE: String)
# + readEvent(targE: String) : Event
# + writeCalendar(targC: String)
# + readCalendar(targC: String): Calendar
# + writeNotification(targN: String)
# + readNotification(targN: String): Notification
# + transferEvent(source: String, dest: String, event: String)
# + readAllCalendarData() <<iterable>> Calendar
# + readAllNotifData(): <<iterable>> Notification


import json


# Data is held at member data
# This data is converted from json style string to python dictionary
# per the table in documentation https://docs.python.org/3/library/json.html
# NOTE: Key changes - data is a python dictionary that contains dictionary.
# NOTE  - Any changes done needs to modify this dictionary - meaning we need key information to access right part.
class Database:
    def __init__(self, db_file='data.json'):
        self.out = db_file
        with open(db_file) as json_f:
            self.data = json.load(json_f)  
        # Now that the file is open. close file.

    # Internal function to update the data base when writing.
    def update(self):
        with open(self.out, "w") as outfile:
            json.dump(self.data, outfile)
    

    # ############### potentially not needed ##############
    # # Each write event requires identifications for the main python object
    # def writeEvent(self, calendar, event, event_object):
    #     # Read in Event data structure and convert into JSON
    #     # Append to current JSON database file
        
    #     self.update() # all write methode will need update.

    # def readEvent(self, targE):
    #     # Open JSON database file
    #     # Find Event object with the same name as the one specified by targE
    #     # Must be in the calendar we are requesting
        
    #     pass    # return event

    # def writeCalendar(self, targC):
    #     # Read in Calendar data structure and convert into JSON
    #     # Append to current JSON database file
        
    #     pass
    #     self.update() # all write methode will need update.

    # FIXME marked for potential deletion
    def readCalendar(self, targC): 
        # Open JSON database file
        # Find Calendar object with the same name as the one specified by targC
        
        pass    # return calendar
    

    # FIXME marked for potential deletion
    # def writeNotification(self, targN):
    #     # Read in Notification data structure and convert into JSON
    #     # Put into appropriate Event object within correct Calendar
    #     # Append to current JSON database file
        
    #     pass
    #     self.update() # all write methode will need update.


    # FIXME marked for potential deletion
    def readNotification(self, targN):
        # Open JSON database file
        # Find Notification object with the same name as the one specified by targN
        # Must be in correct Event, with correct Calendar
        
        pass    # return notification


    # FIXME marked for potential deletion
    def transferEvent(self, source, dest, event):
        # Read data from JSON database file
        # Find event in source Calendar
        # Copy into destination Calendar
        # Delete event from original (source) Calendar
        
        self.update() # all write methode will need update.

    # returns reference to calendars dictionary of database
    def readAllCalendarData(self):
        calendars = self.data["data"]["calendars"]

        if len(calendars) == 0: # error checker for if data base didnt loas
            raise Exception("readAllCalendarData error - cannot find calendars.")

        return calendars

    # return notifications dictionary of database
    def readAllNotifData(self):
        notifications = self.data["data"]["notifications"]
        
        if len(notifications) == 0:  # error checker to see if valid dictionary exists
            raise Exception("readAllNotifData error - cannot find notifications.")
        return notifications
