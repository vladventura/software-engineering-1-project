#
#   Notification Unit Test
#
#   Written by: Max Tighe
#
#   Description: A unit testing class designed to test
#               the functionality of the Notification class.
#

from Notification import Notification
import unittest, datetime
import smtplib, ssl #email functionality
from enum import Enum

class NotifTest(unittest.TestCase):
    
    #uses Notification class under normal circumstances, should send email if functions are proper
    def test_regular_notif(self):

        calendar = "TestCal"
        event = "TestEvent"
        date = datetime.datetime.now()
        comparisonDate = datetime.datetime.now()
        window = datetime.time(3,0,0)
        repeats = True
        frequency = datetime.time(6,0,0)
        method = 1

        temp = Notification(calendar, event, date, window, repeats, frequency, method)

        self.assertEqual(temp.calendar, calendar)
        self.assertEqual(temp.event, event)
        self.assertEqual(temp.date, comparisonDate)
        self.assertEqual(temp.window, window)
        self.assertTrue(temp.repeats)
        self.assertEqual(temp.frequency, frequency)
        self.assertEqual(temp.method, method)

        temp.sendNotification("etighe238@gmail.com")

    #tests to ensure Notification class's default values work
    def test_empty_notif(self):

        calendar = "N/A"
        event = "N/A"
        date = datetime.datetime
        comparisonDate = datetime.datetime

        temp = Notification(calendar, event, date)

        self.assertEqual(temp.calendar, calendar)
        self.assertEqual(temp.event, event)
        self.assertEqual(temp.date, comparisonDate)
        self.assertEqual(temp.window, datetime.time())
        self.assertFalse(temp.repeats)
        self.assertEqual(temp.frequency, 0)
        self.assertEqual(temp.method, 0)