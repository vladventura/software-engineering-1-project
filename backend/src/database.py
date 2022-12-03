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
class Database:
    def __init__(self, db_file='data.json'):
        try:
            with open(db_file) as json_f:
                self.data = json.load(json_f)  
            # Now that the file is open. close file.
            json_f.close()
        except OSError:
            raise OSError
    
    def writeEvent(self, targE):
        # Read in Event data structure and convert into JSON
        # Append to current JSON database file
        
        pass

    def readEvent(self, targE):
        # Open JSON database file
        # Find Event object with the same name as the one specified by targE
        # Must be in the calendar we are requesting
        
        pass    # return event

    def writeCalendar(self, targC):
        # Read in Calendar data structure and convert into JSON
        # Append to current JSON database file
        
        pass

    def readCalendar(self, targC): 
        # Open JSON database file
        # Find Calendar object with the same name as the one specified by targC
        
        pass    # return calendar
    
    def writeNotification(self, targN):
        # Read in Notification data structure and convert into JSON
        # Put into appropriate Event object within correct Calendar
        # Append to current JSON database file
        
        pass

    def readNotification(self, targN):
        # Open JSON database file
        # Find Notification object with the same name as the one specified by targN
        # Must be in correct Event, with correct Calendar
        
        pass    # return notification

    def transferEvent(self, source, dest, event):
        # Read data from JSON database file
        # Find event in source Calendar
        # Copy into destination Calendar
        # Delete event from original (source) Calendar
        
        pass

    def readAllCalendarData(self):
        # Read in data from JSON database file
        # Find all Calendar objects
        # Create a list of Calendar objects

        pass    # return calendars = a list of Calendar objects

    def readAllNotifData(self):
        # Read in data from JSON database file
        # Find all Notification objects
        # Just Notifications within a certain Calendar?
        # Create a list of Notification objects

        pass    # return notifications = a list of Notification objects