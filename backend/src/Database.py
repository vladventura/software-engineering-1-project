# Authors: Zachary McCann, Jae Choi
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
            json.dump(self.data, outfile, default=str)


    # returns reference to calendars dictionary of database
    def getCalendarData(self):
        calendars = self.data["data"]["calendars"]

        if len(calendars) == 0: # error checker for if data base didnt loas
            raise Exception("readAllCalendarData error - cannot find calendars.")

        return calendars

    # return notifications dictionary of database
    def getNotifData(self):
        notifications = self.data["data"]["notifications"]
        
        if len(notifications) == 0:  # error checker to see if valid dictionary exists
            raise Exception("readAllNotifData error - cannot find notifications.")
        return notifications
