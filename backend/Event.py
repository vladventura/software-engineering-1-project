# Event classes
# 
# Written by: Max Tighe
#
# Event Description: Class designed to store a calendar event's info
#
# Class Event Description: Class designed to store a class calendar event's 
#                           info created by a class the user is taking
#

import datetime
from enum import Enum

class Event:
    title = str
    description = str

    date = datetime.datetime
    duration = datetime.datetime

    repeats = bool

    class Repetition(Enum): # Enum for each kind of frequency an event can repeat
        DAILY = 1
        WEEKLY = 2
        MONTHLY = 3
        YEARLY = 4

    frequency = Repetition # how frequently the event repeats


    def __init__(self, title, desc, date, dur, repeats = 0, freq = 2):
        self.title = title
        self.description = desc
        self.date = date
        self.duration = dur
        self.repeats = repeats
        self.frequency = freq


# Child class to store events created by classes the user is taking
class ClassEvent(Event): 

    submitted = bool

    grade = float

    def __init__(self, title, desc, date, dur, repeats = 0, freq = 2):
        self.title = title
        self.description = desc
        self.date = date
        self.duration = dur
        self.repeats = repeats
        self.frequency = freq
        self.submitted = False
        self.grade = 0.00
