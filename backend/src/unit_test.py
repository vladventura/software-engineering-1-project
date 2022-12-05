import unittest
from database import Database
from datetime import datetime, time
from notification import NotificationManager, NotificationMethod

class UnitTest(unittest.TestCase):
    def testConstruction(self):
        self.file = "test_data.json"
        db = Database(self.file)
        self.assertNotEqual(len(db.data), 0)

    def testDatabaseFunctionalities(self):
        self.file = "test_data.json"
        db = Database(self.file)
        
        calendars = db.getCalendarData()
        notifications = db.getNotifData()

        # to test functionalities I want to see if I can edit some of the data in calendars and see if the main db changes
        calendars["class1"]["events"]["Homework1"]["description"] = "Homework"
        # check if the proper json entry got modified
        self.assertEqual(db.data["data"]["calendars"]["class1"]["events"]["Homework1"]["description"], "Homework")
        # check to see if they map to proper part of the original json
        self.assertDictEqual(db.data["data"]["calendars"], calendars)
        self.assertDictEqual(db.data["data"]["notifications"], notifications)

    def testNotifications(self):
        self.file = "test_data.json"
        db = Database(self.file)

        calendar = "class1"
        event = "Homework1"

        # test proper allocation of notifications and its db entry
        nm = NotificationManager(db)
        item = nm.getObject(calendar, event)
        db_entry = nm.getDbObject(calendar, event)

        self.assertFalse(item is None)
        self.assertFalse(db_entry is None)

        # test edit - need to check if appropriate change is made
        method = NotificationMethod.BOTH
        nm.editNotification(calendar, event, method=method)
        self.assertEqual(item.method, method)
        self.assertEqual(db_entry["method"], method.name)

        # checking deletion
        nm.deleteNotification(calendar, event)
        item = nm.getObject(calendar, event)
        db_entry = nm.getDbObject(calendar, event)
        self.assertTrue(item is None)
        self.assertTrue(db_entry is None)


        date = datetime(2015, 1, 1, 12, 30, 59, 0)
        # finally the creation of a different notification
        nm.createNotification (
            "Calendar",
            "Event",
            time.fromisoformat("12:00:00"),
            True,
            1,
            NotificationMethod.SMS,
            date
        )

        # check if the object exists and check some of the objects
        item = nm.getObject("Calendar", "Event")
        self.assertEqual(item.info.date,  date)
        self.assertEqual(item.method, NotificationMethod.SMS)

        # check with db.
        db_entry = nm.getDbObject("Calendar", "Event")
        self.assertEqual(db_entry["date"], str(date))
        self.assertEqual(db_entry["method"], NotificationMethod.SMS.name)

        

if __name__ == '__main__':
    unittest.main()
