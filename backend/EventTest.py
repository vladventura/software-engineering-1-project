# Event Tests
# 
# Written by: Max Tighe
#
# Description: Class designed to test the Event and Class Event classes
#

import unittest
import datetime

from Event import Event
from Event import ClassEvent

class EventTests(unittest.TestCase):

    def test_event_basic(self):
        tempDate = datetime.datetime(year=2022, month=12, day=30, hour=12, minute=33, second=10)
        tempDur = datetime.datetime(year=2023, month=1, day=1, hour=16, minute=00, second=00)


        temp = Event("test", 
                    "that's a clean-runnin' description I tell you hwut",
                    tempDate, tempDur)

        self.assertEqual(temp.title, "test")
        self.assertEqual(temp.description,
        "that's a clean-runnin' description I tell you hwut")
        self.assertEqual(temp.date, tempDate)
        self.assertEqual(temp.duration, tempDur)
        self.assertFalse(temp.repeats)
        self.assertEqual(temp.frequency, 2)


    def test_event_repeats(self):
        tempDate = datetime.datetime(year=2024, month=11, day=30, hour=11, minute=33, second=10)
        tempDur = datetime.datetime(year=2025, month=3, day=3, hour=16, minute=00, second=00)

        temp = Event("testing again", "test2", tempDate, tempDur, True, 3)

        self.assertEqual(temp.title, "testing again")
        self.assertEqual(temp.description,"test2")
        self.assertEqual(temp.date, tempDate)
        self.assertEqual(temp.duration, tempDur)
        self.assertTrue(temp.repeats)
        self.assertEqual(temp.frequency, 3)


    def test_class_event(self):
        tempDate = datetime.datetime(year=2024, month=11, day=30, hour=11, minute=33, second=10)

        tempDur = datetime.datetime(year=2025, month=3, day=3, hour=16, minute=00, second=00)

        temp = ClassEvent("testing class", "test3", tempDate, tempDur, False, 2)

        self.assertEqual(temp.title, "testing class")
        self.assertEqual(temp.description,"test3")
        self.assertEqual(temp.date, tempDate)
        self.assertEqual(temp.duration, tempDur)
        self.assertFalse(temp.repeats)
        self.assertEqual(temp.frequency, 2)
        self.assertFalse(temp.submitted)
        self.assertEqual(temp.grade, 0.00)