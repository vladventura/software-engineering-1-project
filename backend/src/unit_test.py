import unittest
from database import Database

class DatabaseTest(unittest.TestCase):
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
        

if __name__ == '__main__':
    unittest.main()
