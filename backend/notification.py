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
        self.calendar = ""

    def sendNotification(self):
        pass
