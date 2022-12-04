#
#   Notification Manager Unit Test
#
#   Written by: Max Tighe
#
#   Description: A unit testing class designed to test
#               the functionality of the Notification manager class.
#

from Notification import Notification
from Database import Database
from NotificationManager import NotificationManager
import unittest, datetime

class NotifManagerTest(unittest.TestCase):

    def test_regular_notifmanager(self):
        tempDate = datetime.datetime(year=2024, month=11, day=30, hour=11, minute=33, second=10)

        tempDur = datetime.time(3,0,0)

        tempDatabase = Database()

        temp = NotificationManager(tempDatabase)

        temp.createNotification("testing", "testerino", tempDate, tempDur, False, 0, 1)

        key = "testing"+"testerino"

        key2 = "class1"+"Homework1"

        self.assertEqual(temp.notifs_table[key].date, tempDate)
        self.assertEqual(temp.notifs_table[key].window, tempDur)
        self.assertFalse(temp.notifs_table[key].repeats)
        self.assertEqual(temp.notifs_table[key].frequency, 0)
        self.assertEqual(temp.notifs_table[("testing"+"testerino")].method, 1)


        tempDate2 = datetime.datetime.fromisoformat("2022-12-06T23:59:00")

        tempDur2 = datetime.time.fromisoformat("03:00:00")

        self.assertEqual(temp.notifs_table[key2].date, tempDate2)
        self.assertEqual(temp.notifs_table[key2].window, tempDur2)
        self.assertFalse(temp.notifs_table[key2].repeats)
        self.assertEqual(temp.notifs_table[key2].frequency, 0)
        self.assertEqual(temp.notifs_table[key2].method, 1)