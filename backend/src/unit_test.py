import unittest
from database import Database

class DatabaseTest(unittest.TestCase):
    def testConstruction(self):
        self.file = "test_data.json"
        db = Database()
        self.assertNotEqual(len(db.data), 0)
        


if __name__ == '__main__':
    unittest.main()
